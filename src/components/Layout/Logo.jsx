import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { eventEmitter } from '../../utils/events';

const LogoContainer = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  margin-left: 24px;

  &:hover {
    filter: blur(0.5px) brightness(1.3);
    text-shadow: 0 0 10px ${theme.colors.primary}80;
    color: ${theme.colors.secondary};
  }
`;

const LogoIcon = styled.img`
  height: 32px;
  width: auto;
  transition: all 0.3s ease;

  ${LogoContainer}:hover & {
    filter: drop-shadow(0 0 10px ${theme.colors.primary});
  }
`;

const LogoText = styled.span`
  background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;

  ${LogoContainer}:hover & {
    filter: drop-shadow(0 0 8px ${theme.colors.primary});
  }
`;

export const Logo = ({ onClick }) => {
  const handleContextMenu = (e) => {
    e.preventDefault();
    eventEmitter.emit('refreshVideos');
  };

  return (
    <LogoContainer
      className="quantum-logo"
      onClick={onClick}
      onContextMenu={handleContextMenu}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <LogoIcon src="/quantum-logo.svg" alt="QuantumTube" />
      <LogoText>QuantumTube</LogoText>
    </LogoContainer>
  );
}; 