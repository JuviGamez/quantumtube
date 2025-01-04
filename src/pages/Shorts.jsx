import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../theme';

const Container = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${theme.colors.background};
`;

const BetaCard = styled(motion.div)`
  background: ${theme.colors.surface};
  padding: 48px;
  border-radius: 24px;
  text-align: center;
  border: 1px solid ${theme.colors.border};
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  margin-bottom: 16px;
  background: linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BetaTag = styled.span`
  background: ${theme.colors.primary};
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  margin-left: 8px;
  vertical-align: middle;
`;

const Message = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1.1rem;
  line-height: 1.5;
  margin-bottom: 24px;
`;

const ComingSoon = styled.div`
  color: ${theme.colors.text};
  font-size: 1.2rem;
  padding: 12px 24px;
  background: rgba(145, 71, 255, 0.1);
  border-radius: 12px;
  display: inline-block;
`;

const Shorts = () => {
  return (
    <Container>
      <BetaCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>
          Shorts
          <BetaTag>BETA</BetaTag>
        </Title>
        <Message>
          We're working on bringing you an amazing Shorts experience. 
          Our team is currently optimizing the feature to ensure the best possible performance.
        </Message>
        <ComingSoon>
          Coming Soon
        </ComingSoon>
      </BetaCard>
    </Container>
  );
};

export default Shorts; 