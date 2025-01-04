import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../theme';

const TourOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const TourCard = styled(motion.div)`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: 16px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  color: ${theme.colors.text};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h2`
  color: ${theme.colors.primary};
  margin-bottom: 24px;
  font-size: 1.8rem;
`;

const Description = styled.div`
  margin-bottom: 24px;
  line-height: 1.6;
  font-size: 1.1rem;

  ul {
    margin: 16px 0;
    padding-left: 20px;
  }

  li {
    margin: 12px 0;
    color: ${theme.colors.textSecondary};
  }

  strong {
    color: ${theme.colors.primary};
  }
`;

const Button = styled(motion.button)`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 24px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.1rem;

  &:hover {
    background: ${theme.colors.secondary};
  }
`;

const steps = [
  {
    title: 'Welcome to QuantumTube!',
    description: `
      Let's get you started with some quick tips:
      
      • Right-click the QuantumTube logo to quickly refresh the page
      • Left-click the logo to show/hide the navigation sidebar
      • Use the sidebar to access all your content
    `
  },
  {
    title: 'Your Library',
    description: `
      Keep track of your content:
      
      • Find your liked videos in the "Liked Videos" section
      • View your watch history anytime
      • Access your subscribed channels easily
      • Discover trending videos and shorts
    `
  },
  {
    title: 'Ready to Go!',
    description: `
      You're all set to explore QuantumTube! 
      
      Remember:
      • Subscribe to channels you enjoy
      • Like videos to save them for later
      • Use the search bar to find specific content
      
      Enjoy your quantum journey! 🚀
    `
  }
];

export const Tour = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const firstTime = localStorage.getItem('quantumtube_first_time');
    if (firstTime === null) {
      localStorage.setItem('quantumtube_first_time', '0');
      setIsVisible(true);
    } else if (firstTime === '0') {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      setIsVisible(false);
      localStorage.setItem('quantumtube_first_time', '1');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <TourOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <TourCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Title>{steps[currentStep].title}</Title>
          <Description>
            {steps[currentStep].description.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </Description>
          <Button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
          >
            {currentStep === steps.length - 1 ? 'Get Started!' : 'Next'}
          </Button>
        </TourCard>
      </TourOverlay>
    </AnimatePresence>
  );
}; 