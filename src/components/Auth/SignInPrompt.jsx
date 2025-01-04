import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { useUser } from '../../contexts/UserContext';
import { useState } from 'react';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: ${theme.colors.surface};
  border-radius: 16px;
  border: 1px solid ${theme.colors.border};
  text-align: center;
  max-width: 500px;
  margin: 48px auto;
`;

const Title = styled.h2`
  color: ${theme.colors.text};
  margin-bottom: 16px;
  font-size: 1.5rem;
`;

const Description = styled.p`
  color: ${theme.colors.textSecondary};
  margin-bottom: 24px;
  line-height: 1.5;
`;

const SignInButton = styled(motion.button)`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.secondary};
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  margin-top: 16px;
  font-size: 0.9rem;
`;

export const SignInPrompt = () => {
  const { signIn } = useUser();
  const [error, setError] = useState(null);

  const handleSignIn = async () => {
    try {
      setError(null);
      console.log('Starting sign in...');
      const result = await signIn();
      console.log('Sign in completed:', result);
    } catch (err) {
      console.error('Sign in error in component:', err);
      setError(
        err.details || err.message || 'Failed to sign in. Please try again.'
      );
    }
  };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Title>Sign in to QuantumTube</Title>
      <Description>
        Sign in with your Google account to access your personalized feed,
        subscriptions, and more.
      </Description>
      <SignInButton
        onClick={handleSignIn}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign in with Google
      </SignInButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}; 