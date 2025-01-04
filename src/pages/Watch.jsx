import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import Plyr from 'plyr-react';
import "plyr-react/plyr.css";
import '../styles/plyr-custom.css';
import { getVideoDetails, getVideoCaptions, getChannelDetails } from '../services/youtube';
import Comments from '../components/Video/Comments';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import { LikeButton } from '../components/Video/LikeButton';
import { SubscribeButton } from '../components/Video/SubscribeButton';
import { storageService } from '../services/storage';
import { formatSubscriberCount } from '../utils/formatters';

const Container = styled.div`
  padding: 20px;
  width: 100%;
  margin: 0 auto;
  color: white;
`;

const VideoContainer = styled(motion.div)`
  position: relative;
  padding-top: 56.25%;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px -10px rgba(147, 51, 234, 0.3);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 30px -5px rgba(147, 51, 234, 0.5);
  }

  .plyr {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const VideoInfo = styled.div`
  margin-bottom: 24px;
`;

const ChannelSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-top: 1px solid ${theme.colors.border};
  border-bottom: 1px solid ${theme.colors.border};
  margin: 16px 0;
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ChannelAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${theme.colors.border};
`;

const ChannelText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ChannelName = styled.h3`
  color: ${theme.colors.text};
  font-size: 1.1rem;
  font-weight: 500;
`;

const ChannelStats = styled.span`
  color: ${theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const DescriptionBox = styled(motion.div)`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: 16px;
  padding: 20px;
  margin-top: 24px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 20px ${theme.colors.primary}40;
    border-color: ${theme.colors.primary};
  }
`;

const Description = styled.p`
  white-space: pre-wrap;
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
`;

const Title = styled(motion.h1)`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, ${theme.colors.text}, ${theme.colors.textSecondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Stats = styled.div`
  color: #aaa;
  margin-bottom: 1rem;
`;

const Watch = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [captionsUrl, setCaptionsUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    let blobUrl = null;

    const loadVideoAndCaptions = async () => {
      try {
        const [videoData, captionsData] = await Promise.all([
          getVideoDetails(videoId),
          getVideoCaptions(videoId)
        ]);
        
        if (mounted) {
          setVideo(videoData);
          if (captionsData) {
            // Create a blob URL for the captions
            const blob = new Blob([captionsData], { type: 'text/vtt' });
            blobUrl = URL.createObjectURL(blob);
            setCaptionsUrl(blobUrl);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadVideoAndCaptions();

    return () => {
      mounted = false;
      // Clean up blob URL
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [videoId]);

  useEffect(() => {
    const loadVideoDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const videoData = await getVideoDetails(videoId);
        setVideo(videoData);

        // Only fetch channel details after we have the video data
        if (videoData?.snippet?.channelId) {
          const channelData = await getChannelDetails(videoData.snippet.channelId);
          setChannelDetails(channelData);
        }
        
      } catch (error) {
        console.error('Error loading video:', error);
        setError('Failed to load video');
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      loadVideoDetails();
    }
  }, [videoId]);

  const plyrProps = {
    source: {
      type: 'video',
      sources: [
        {
          src: videoId,
          provider: 'youtube',
        }
      ]
    },
    options: {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'captions',
        'settings',
        'pip',
        'fullscreen'
      ],
      settings: ['quality', 'speed'],
      youtube: {
        noCookie: false,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin,
        iv_load_policy: 3,
        controls: 1
      },
      quality: {
        default: 1080,
        options: [4320, 2880, 2160, 1440, 1080, 720, 480, 360, 240]
      },
      autoplay: false
    }
  };

  useEffect(() => {
    const blockAds = () => {
      // Find and remove ad containers
      const adElements = document.querySelectorAll('.ytp-ad-overlay-container, .ytp-ad-text-overlay, .video-ads');
      adElements.forEach(el => el.remove());

      // Skip ad if playing
      const player = document.querySelector('.plyr__video-embed iframe');
      if (player) {
        const skipButton = player.contentDocument?.querySelector('.ytp-ad-skip-button');
        if (skipButton) {
          skipButton.click();
        }
      }
    };

    // Run ad blocker periodically
    const adBlockInterval = setInterval(blockAds, 1000);

    return () => {
      clearInterval(adBlockInterval);
    };
  }, []);

  useEffect(() => {
    if (video) {
      storageService.addToHistory(video);
    }
  }, [video]);

  if (loading) return <Container>Loading...</Container>;
  if (!video) return <Container>Video not found</Container>;

  return (
    <Container>
      <VideoContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Plyr {...plyrProps} />
      </VideoContainer>
      
      <VideoInfo>
        <Title
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {video.snippet.title}
        </Title>
        <Stats>
          {parseInt(video.statistics.viewCount).toLocaleString()} views • 
          {new Date(video.snippet.publishedAt).toLocaleDateString()}
        </Stats>
        
        <ChannelSection>
          {channelDetails ? (
            <ChannelInfo onClick={() => navigate(`/channel/${video.snippet.channelId}`)}>
              <ChannelAvatar 
                src={channelDetails.snippet?.thumbnails?.default?.url} 
                alt={video.snippet.channelTitle}
              />
              <ChannelText>
                <ChannelName>{video.snippet.channelTitle}</ChannelName>
                <ChannelStats>
                  {channelDetails.statistics?.subscriberCount ? 
                    `${formatSubscriberCount(channelDetails.statistics.subscriberCount)} subscribers • ` 
                    : ''}
                  {video.statistics?.likeCount ? 
                    `${parseInt(video.statistics.likeCount).toLocaleString()} likes` 
                    : ''}
                </ChannelStats>
              </ChannelText>
            </ChannelInfo>
          ) : (
            <div>Loading channel info...</div>
          )}
          <ButtonContainer>
            <LikeButton video={video} />
            {channelDetails && (
              <SubscribeButton 
                channel={{
                  id: video.snippet.channelId,
                  title: video.snippet.channelTitle,
                  thumbnail: channelDetails.snippet?.thumbnails?.default?.url
                }} 
              />
            )}
          </ButtonContainer>
        </ChannelSection>

        <DescriptionBox
          whileHover={{ 
            scale: 1.01,
            transition: { duration: 0.2 }
          }}
        >
          <Description>{video.snippet.description}</Description>
        </DescriptionBox>
      </VideoInfo>

      <Comments videoId={videoId} />
    </Container>
  );
};

export default Watch; 