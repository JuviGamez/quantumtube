import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { Logo } from './Logo';
import CosmicSearch from './CosmicSearch';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${theme.colors.surface}80;
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  padding: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px ${theme.colors.primary}20;
`;

const SearchContainer = styled.div`
  position: relative;
  margin-left: auto;
  padding-right: 24px;
`;

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsFocused(false);
    }
  };

  const handleLogoClick = () => {
    onToggleSidebar();
  };

  return (
    <Nav>
      <Logo onClick={handleLogoClick} />
      <SearchContainer>
        <CosmicSearch
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onSubmit={handleSearch}
        />
      </SearchContainer>
    </Nav>
  );
};

export default Navbar; 