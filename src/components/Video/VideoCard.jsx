import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../theme';
import { formatViewCount } from '../../utils/formatters';

const Card = styled(motion.div)`
  width: 100%;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  position: relative;
  isolation: isolate;
  transition: ${theme.transitions.default};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      ${theme.colors.primary}20 0%,
      ${theme.colors.secondary}40 50%,
      ${theme.colors.highlight}20 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const Thumbnail = styled(motion.img)`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  transition: transform 0.15s ease;
`;

const Content = styled.div`
  padding: 12px;
`;

const Title = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: 8px;
  background: linear-gradient(90deg, ${theme.colors.text}, ${theme.colors.textSecondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MetaText = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

const ViewCount = styled(motion.span)`
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.8);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  z-index: 2;
  backdrop-filter: blur(4px);
  border: 1px solid ${theme.colors.border};
  transform-origin: right;
`;

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const views = formatViewCount(video.statistics?.viewCount || 0);
  
  return (
    <Card
      whileHover={{ 
        scale: 1.03,
        boxShadow: `0 8px 32px ${theme.colors.primary}40`,
        y: -5
      }}
      whileTap={{ 
        scale: 0.98,
        boxShadow: `0 4px 16px ${theme.colors.primary}30`,
        y: 0
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      onClick={() => navigate(`/watch/${video.id}`)}
    >
      <Thumbnail
        src={video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url}
        alt={video.snippet.title}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.15 }}
      />
      <ViewCount
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.15, delay: 0.1 }}
      >
        {views} views
      </ViewCount>
      <Content>
        <Title>{video.snippet.title}</Title>
        <MetaText>{video.snippet.channelTitle}</MetaText>
        <MetaText>
          {new Date(video.snippet.publishedAt).toLocaleDateString()}
        </MetaText>
      </Content>
    </Card>
  );
};

export default VideoCard; 