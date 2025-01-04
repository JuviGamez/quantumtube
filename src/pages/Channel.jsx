import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { getChannelDetails, getChannelVideos } from '../services/youtube';
import VideoCard from '../components/Video/VideoCard';
import { theme } from '../theme';
import { formatSubscriberCount } from '../utils/formatters';

const Container = styled.div`
  padding: 24px;
  max-width: 1800px;
  margin: 0 auto;
`;

const ChannelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
  padding: 24px;
  background: ${theme.colors.surface};
  border-radius: 16px;
  border: 1px solid ${theme.colors.border};
`;

const ChannelAvatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid ${theme.colors.primary};
`;

const ChannelInfo = styled.div`
  flex: 1;
`;

const ChannelName = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text};
  margin-bottom: 8px;
`;

const ChannelStats = styled.div`
  color: ${theme.colors.textSecondary};
  font-size: 1.1rem;
`;

const VideosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const Channel = () => {
  const { channelId } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChannelData = async () => {
      try {
        const [channelData, videosData] = await Promise.all([
          getChannelDetails(channelId),
          getChannelVideos(channelId)
        ]);
        setChannel(channelData);
        setVideos(videosData.items);
      } catch (error) {
        console.error('Error loading channel:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChannelData();
  }, [channelId]);

  if (loading) return <Container>Loading...</Container>;
  if (!channel) return <Container>Channel not found</Container>;

  return (
    <Container>
      <ChannelHeader>
        <ChannelAvatar 
          src={channel.snippet.thumbnails.high.url} 
          alt={channel.snippet.title}
        />
        <ChannelInfo>
          <ChannelName>{channel.snippet.title}</ChannelName>
          <ChannelStats>
            {formatSubscriberCount(channel.statistics.subscriberCount)} subscribers •{' '}
            {parseInt(channel.statistics.videoCount).toLocaleString()} videos
          </ChannelStats>
        </ChannelInfo>
      </ChannelHeader>

      <VideosGrid>
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </VideosGrid>
    </Container>
  );
};

export default Channel; 