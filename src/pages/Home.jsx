import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import VideoCard from '../components/Video/VideoCard';
import { fetchVideos } from '../services/youtube';
import { theme } from '../theme';
import { RandomizeButton } from '../components/Video/RandomizeButton';
import { eventEmitter } from '../utils/events';

const Container = styled.div`
  padding: 32px 0;
  padding-left: 72px;
  transition: padding 0.3s ease;
  width: 100%;

  @media (min-width: 1024px) {
    padding-left: ${props => props.sidebarExpanded ? '240px' : '72px'};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(380px, 1fr));
  gap: 24px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 1600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    max-width: 900px;
    gap: 40px;
  }
`;

const LoadingText = styled.div`
  color: ${theme.colors.text};
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`;

const ErrorText = styled(LoadingText)`
  color: ${theme.colors.primary};
`;

const Home = ({ sidebarExpanded }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState('');

  useEffect(() => {
    // Check and initialize quantumtube_first_time in localStorage
    const firstTime = localStorage.getItem('quantumtube_first_time');
    if (firstTime === null) {
      localStorage.setItem('quantumtube_first_time', '0');
    }
  }, []);

  const getRandomPageToken = () => {
    // Generate a random string that YouTube's API will use as a page token
    const tokens = ['', 'CDIQAA', 'CGQQAA', 'CJYBEAA', 'CMgBEAA', 'CPoBEAA'];
    return tokens[Math.floor(Math.random() * tokens.length)];
  };

  const loadVideos = async (pageToken = '') => {
    try {
      setLoading(true);
      setError(null);
      // Use random token on initial load
      const randomToken = pageToken || getRandomPageToken();
      const data = await fetchVideos(randomToken);
      if (data?.items?.length) {
        setVideos(data.items);
        setNextPageToken(data.nextPageToken || '');
      } else {
        setError('No videos available');
      }
    } catch (error) {
      console.error('Error loading videos:', error);
      setError('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  // Load new videos when clicking randomize
  const handleRandomize = async () => {
    if (nextPageToken) {
      await loadVideos(nextPageToken);
    } else {
      // If no next page token, use a random one
      await loadVideos(getRandomPageToken());
    }
  };

  useEffect(() => {
    // Initial load
    loadVideos();

    // Listen for refresh events
    eventEmitter.on('refreshVideos', () => {
      loadVideos(getRandomPageToken());
    });
  }, []);

  if (loading) {
    return <LoadingText>Loading videos...</LoadingText>;
  }

  if (error) {
    return <ErrorText>Error: {error}</ErrorText>;
  }

  if (!videos.length) {
    return <ErrorText>No videos available</ErrorText>;
  }

  return (
    <Container sidebarExpanded={sidebarExpanded}>
      <RandomizeButton onClick={handleRandomize} />
      <Grid>
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 