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

const LikedVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(storageService.getLikedVideos());
  }, []);

  if (!videos.length) {
    return <Message>No liked videos yet</Message>;
  }

  return (
    <Grid>
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </Grid>
  );
};

export default LikedVideos; 