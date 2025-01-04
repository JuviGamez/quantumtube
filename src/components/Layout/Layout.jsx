import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import Navbar from './Navbar';
import { Sidebar } from './Sidebar';
import { useState } from 'react';

const LayoutContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  padding-top: 60px;
  margin-left: ${props => props.sidebarWidth}px;
  transition: margin-left 0.3s ease;
  width: calc(100% - ${props => props.sidebarWidth}px);
`;

const Content = styled(motion.main)`
  width: 100%;
  padding: 24px;
  transition: all 0.3s ease;
`;

const Layout = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const sidebarWidth = isExpanded ? 240 : 72;

  const handleToggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Sidebar isExpanded={isExpanded} />
      <LayoutContainer sidebarWidth={sidebarWidth}>
        <Content
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </Content>
      </LayoutContainer>
    </>
  );
};

export default Layout; 