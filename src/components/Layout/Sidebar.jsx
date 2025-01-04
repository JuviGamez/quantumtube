import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../theme';
import { 
  Home, Menu, Trending, Subscriptions, 
  History, Library, LikedVideos, WatchLater, Shorts 
} from '../Icons';

const SidebarWrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  width: ${props => props.isExpanded ? '240px' : '72px'};
  background: ${theme.colors.surface};
  border-right: 1px solid ${theme.colors.border};
  z-index: 100;
  transition: all 0.3s ease;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 4px;
  }
`;

const Section = styled.div`
  padding: 8px 0;
  border-top: 1px solid ${theme.colors.border};
  margin-top: 8px;
`;

const SidebarItem = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 8px ${props => props.isExpanded ? '24px' : '24px'};
  justify-content: ${props => props.isExpanded ? 'flex-start' : 'center'};
  cursor: pointer;
  color: ${props => props.isActive ? theme.colors.primary : theme.colors.text};
  transition: all 0.2s ease;
  min-height: 40px;

  &:hover {
    background: ${theme.colors.border}20;
    color: ${theme.colors.primary};
  }

  svg {
    width: 24px;
    height: 24px;
    min-width: 24px;
    margin-right: ${props => props.isExpanded ? '24px' : '0'};
  }

  span {
    font-size: 14px;
    white-space: nowrap;
    opacity: ${props => props.isExpanded ? 1 : 0};
    transition: opacity 0.2s ease;
    overflow: hidden;
    width: ${props => props.isExpanded ? 'auto' : '0'};
  }
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  cursor: pointer;
  user-select: none;

  img {
    width: 32px;
    height: 32px;
  }

  span {
    font-size: 1.2rem;
    font-weight: 600;
    background: linear-gradient(90deg, ${theme.colors.text}, ${theme.colors.primary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const menuItems = [
  { id: 'home', icon: Home, label: 'Home', path: '/' },
  { id: 'shorts', icon: Shorts, label: 'Shorts', path: '/shorts' },
  { id: 'subscriptions', icon: Subscriptions, label: 'Subscriptions', path: '/subscriptions', tourId: 'subscriptions' },
];

const libraryItems = [
  { id: 'history', icon: History, label: 'History', path: '/history', tourId: 'history' },
  { id: 'liked', icon: LikedVideos, label: 'Liked videos', path: '/liked', tourId: 'liked-videos' },
];

export const Sidebar = ({ isExpanded }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <SidebarWrapper isExpanded={isExpanded} onContextMenu={handleContextMenu}>
      <Section>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            isExpanded={isExpanded}
            isActive={location.pathname === item.path}
            onClick={() => handleItemClick(item.path)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            data-tour={item.tourId}
          >
            <item.icon />
            <span>{item.label}</span>
          </SidebarItem>
        ))}
      </Section>

      <Section>
        {libraryItems.map((item) => (
          <SidebarItem
            key={item.id}
            isExpanded={isExpanded}
            isActive={location.pathname === item.path}
            onClick={() => handleItemClick(item.path)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            data-tour={item.tourId}
          >
            <item.icon />
            <span>{item.label}</span>
          </SidebarItem>
        ))}
      </Section>
    </SidebarWrapper>
  );
}; 