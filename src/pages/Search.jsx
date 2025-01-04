import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import VideoCard from '../components/Video/VideoCard';
import { useSearch } from '../hooks/useSearch';
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

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { videos, loading, error } = useSearch(query);

  if (error) {
    return <Message>Error: {error}</Message>;
  }

  if (loading) {
    return <Message>Searching...</Message>;
  }

  if (!videos.length) {
    return <Message>No videos found for "{query}"</Message>;
  }

  return (
    <Grid>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={{
            id: video.id,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high.url,
            channelTitle: video.snippet.channelTitle,
            viewCount: video.statistics.viewCount,
            publishedAt: new Date(video.snippet.publishedAt).toLocaleDateString()
          }}
        />
      ))}
    </Grid>
  );
};

export default Search; 