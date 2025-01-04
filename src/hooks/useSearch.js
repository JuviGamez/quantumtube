import { useState, useEffect } from 'react';
import { searchVideos } from '../services/youtube';

export const useSearch = (query) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const search = async () => {
      if (!query) {
        setVideos([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await searchVideos(query);
        setVideos(data.items || []);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to search videos');
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query]);

  return { videos, loading, error };
}; 