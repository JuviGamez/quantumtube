import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../../theme';
import { storageService } from '../../services/storage';

const Button = styled(motion.button)`
  background: ${props => props.isLiked ? theme.colors.primary : 'transparent'};
  color: ${props => props.isLiked ? 'white' : theme.colors.text};
  border: 1px solid ${theme.colors.border};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${props => props.isLiked ? theme.colors.secondary : theme.colors.border};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const LikeButton = ({ video }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const liked = storageService.getLikedVideos();
    setIsLiked(liked.some(v => v.id === video.id));
  }, [video.id]);

  const handleClick = () => {
    if (isLiked) {
      storageService.removeLikedVideo(video.id);
    } else {
      storageService.addLikedVideo(video);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Button
      isLiked={isLiked}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
      </svg>
      {isLiked ? 'Liked' : 'Like'}
    </Button>
  );
}; 