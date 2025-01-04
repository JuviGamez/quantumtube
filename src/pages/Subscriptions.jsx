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

const ChannelList = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  overflow-x: auto;
  margin-bottom: 24px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 4px;
  }
`;

const ChannelItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  min-width: 100px;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: ${theme.colors.border}20;
  }

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }

  span {
    font-size: 14px;
    color: ${theme.colors.text};
    text-align: center;
  }
`;

const Subscriptions = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setChannels(storageService.getSubscriptions());
  }, []);

  if (!channels.length) {
    return <Message>No subscriptions yet</Message>;
  }

  return (
    <div>
      <ChannelList>
        {channels.map((channel) => (
          <ChannelItem 
            key={channel.id}
            onClick={() => setSelectedChannel(channel)}
          >
            <img src={channel.thumbnail} alt={channel.title} />
            <span>{channel.title}</span>
          </ChannelItem>
        ))}
      </ChannelList>

      {selectedChannel ? (
        <Grid>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </Grid>
      ) : (
        <Message>Select a channel to see their videos</Message>
      )}
    </div>
  );
};

export default Subscriptions; 