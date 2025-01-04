import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { Shuffle } from '../Icons';

const Button = styled(motion.button)`
  position: fixed;
  top: 70px;
  right: 20px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 90;
  color: ${theme.colors.text};
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover {
    background: ${props => !props.disabled && `${theme.colors.primary}20`};
    color: ${props => !props.disabled && theme.colors.primary};
    border-color: ${props => !props.disabled && theme.colors.primary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const RotatingIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RandomizeButton = ({ onClick, disabled }) => {
  return (
    <Button
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.9 }}
      title="Load New Videos"
      disabled={disabled}
    >
      <RotatingIcon
        animate={{ rotate: disabled ? 360 : 0 }}
        transition={{ duration: 1, repeat: disabled ? Infinity : 0 }}
      >
        <Shuffle />
      </RotatingIcon>
    </Button>
  );
}; 