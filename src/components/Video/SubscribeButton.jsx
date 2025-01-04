import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { storageService } from '../../services/storage';

const Button = styled(motion.button)`
  background: ${props => props.isSubscribed ? 'transparent' : theme.colors.primary};
  color: ${props => props.isSubscribed ? theme.colors.text : 'white'};
  border: 1px solid ${props => props.isSubscribed ? theme.colors.border : 'transparent'};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: ${props => props.isSubscribed ? theme.colors.border : theme.colors.secondary};
  }
`;

export const SubscribeButton = ({ channel }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subs = storageService.getSubscriptions();
    setIsSubscribed(subs.some(s => s.id === channel.id));
  }, [channel.id]);

  const handleClick = () => {
    if (isSubscribed) {
      storageService.removeSubscription(channel.id);
    } else {
      storageService.addSubscription(channel);
    }
    setIsSubscribed(!isSubscribed);
  };

  return (
    <Button
      isSubscribed={isSubscribed}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isSubscribed ? 'Subscribed' : 'Subscribe'}
    </Button>
  );
}; 