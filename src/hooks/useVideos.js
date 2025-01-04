import { useState, useEffect } from 'react';
import { fetchVideos } from '../services/youtube';

export const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchVideos();
        if (mounted) {
          if (!data?.items?.length) {
            setError('No videos available');
            setVideos([]);
          } else {
            setVideos(data.items);
          }
        }
      } catch (err) {
        console.error('Error in useVideos:', err);
        if (mounted) {
          setError('Failed to load videos');
          setVideos([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadVideos();

    return () => {
      mounted = false;
    };
  }, []);

  return { videos, loading, error };
}; 