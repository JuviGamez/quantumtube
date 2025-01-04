import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import VideoCard from '../components/Video/VideoCard';
import { storageService } from '../services/storage';
import { theme } from '../theme';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 32px;
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
`;

const Message = styled.div`
  text-align: center;
  padding: 40px;
  color: ${theme.colors.text};
  background: ${theme.colors.surface};
  border-radius: 12px;
  margin: 24px;
`;

const ClearButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 24px;
  cursor: pointer;
  margin-bottom: 24px;

  &:hover {
    background: ${theme.colors.secondary};
  }
`;

const History = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(storageService.getHistory());
  }, []);

  const handleClearHistory = () => {
    storageService.clearHistory();
    setVideos([]);
  };

  if (!videos.length) {
    return <Message>No watch history yet</Message>;
  }

  return (
    <div>
      <ClearButton onClick={handleClearHistory}>Clear History</ClearButton>
      <Grid>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </Grid>
    </div>
  );
};

export default History; 