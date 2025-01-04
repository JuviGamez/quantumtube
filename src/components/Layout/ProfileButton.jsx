import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { useUser } from '../../contexts/UserContext';

const Button = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled(motion.img)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid ${theme.colors.primary};
`;

const SignInButton = styled(motion.button)`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.secondary};
  }
`;

export const ProfileButton = () => {
  const { isSignedIn, userData, signIn, signOut } = useUser();

  if (!isSignedIn) {
    return (
      <SignInButton
        onClick={signIn}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign In
      </SignInButton>
    );
  }

  return (
    <Button
      onClick={signOut}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Avatar 
        src={userData.imageUrl} 
        alt={userData.name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
    </Button>
  );
}; 