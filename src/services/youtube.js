import axios from 'axios';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Add error handling for missing API key
if (!API_KEY) {
  console.error('YouTube API key is missing! Make sure VITE_YOUTUBE_API_KEY is set in your .env file');
}

const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    key: API_KEY
  },
  headers: {
    'Accept': 'application/json'
  }
});

// Add request interceptor for debugging
youtube.interceptors.request.use(request => {
  console.log('API Request:', request.url, request.params);
  return request;
});

// Update error handling in the interceptor
youtube.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 403) {
      console.error('YouTube API Error:', error.response?.data?.error?.message || 'Access forbidden');
      // Check specific error reasons
      const errorMessage = error.response?.data?.error?.message || '';
      if (errorMessage.includes('API key not valid')) {
        console.error('Invalid API key. Please check your configuration.');
      } else if (errorMessage.includes('quota')) {
        console.error('Quota exceeded');
      } else {
        console.error('Access forbidden - check API key restrictions and permissions');
      }
    }
    return Promise.reject(error);
  }
);

// Update fetchVideos to include better error handling
export const fetchVideos = async (pageToken = '') => {
  try {
    const params = new URLSearchParams({
      part: 'snippet,statistics',
      chart: 'mostPopular',
      maxResults: '50',
      regionCode: 'US', // Add region code
      key: API_KEY,
    });

    if (pageToken) {
      params.append('pageToken', pageToken);
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?${params}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

export const searchVideos = async (query, pageToken = '') => {
  try {
    // First get video IDs from search
    const searchResponse = await youtube.get('/search', {
      params: {
        q: query,
        part: 'id',
        type: 'video',
        maxResults: 50,
        pageToken,
        videoEmbeddable: true,
        safeSearch: 'none'
      }
    });

    if (!searchResponse.data.items?.length) {
      return {
        items: [],
        pageInfo: { totalResults: 0, resultsPerPage: 0 },
        nextPageToken: null
      };
    }

    // Get the video IDs
    const videoIds = searchResponse.data.items
      .map(item => item.id.videoId)
      .filter(Boolean)
      .join(',');

    if (!videoIds) {
      return {
        items: [],
        pageInfo: searchResponse.data.pageInfo,
        nextPageToken: searchResponse.data.nextPageToken
      };
    }

    // Get full video details
    const videosResponse = await youtube.get('/videos', {
      params: {
        id: videoIds,
        part: 'snippet,statistics',
        maxResults: 50
      }
    });

    return {
      items: videosResponse.data.items || [],
      pageInfo: searchResponse.data.pageInfo,
      nextPageToken: searchResponse.data.nextPageToken
    };
  } catch (error) {
    console.error('Error searching videos:', error);
    throw error; // Let the hook handle the error
  }
};

export const getVideoDetails = async (videoId) => {
  try {
    const response = await youtube.get('/videos', {
      params: {
        id: videoId,
        part: 'snippet,statistics,contentDetails',
        fields: 'items(id,snippet,statistics,contentDetails)'
      }
    });
    return response.data.items[0];
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
};

export const getVideoComments = async (videoId, pageToken = '') => {
  try {
    const response = await youtube.get('/commentThreads', {
      params: {
        videoId,
        part: 'snippet,replies',
        maxResults: 20,
        order: 'relevance',
        pageToken
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const getVideoCaptions = async (videoId) => {
  try {
    const response = await youtube.get('/captions', {
      params: {
        part: 'snippet',
        videoId: videoId
      }
    });
    
    if (response.data.items && response.data.items.length > 0) {
      // Find English captions if available
      const englishCaption = response.data.items.find(
        item => item.snippet.language === 'en'
      ) || response.data.items[0];

      if (englishCaption) {
        // You'll need to get the actual caption content here
        // Note: This might require authentication to access captions
        const captionContent = `WEBVTT

1
00:00:01.000 --> 00:00:04.000
Sample caption - actual implementation needed

2
00:00:04.000 --> 00:00:08.000
YouTube API requires OAuth2 for caption download`;

        return captionContent;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching captions:', error);
    return null;
  }
};

export const getChannelDetails = async (channelId) => {
  try {
    const response = await youtube.get('/channels', {
      params: {
        id: channelId,
        part: 'snippet,statistics',
        fields: 'items(id,snippet(title,thumbnails),statistics(subscriberCount,videoCount))'
      }
    });
    return response.data.items[0];
  } catch (error) {
    console.error('Error fetching channel details:', error);
    return null;
  }
};

export const getChannelVideos = async (channelId, pageToken = '') => {
  try {
    // First get video IDs from channel
    const searchResponse = await youtube.get('/search', {
      params: {
        channelId,
        part: 'id',
        order: 'date',
        maxResults: 50,
        type: 'video',
        pageToken
      }
    });

    if (!searchResponse.data.items?.length) {
      return {
        items: [],
        pageInfo: { totalResults: 0, resultsPerPage: 0 },
        nextPageToken: null
      };
    }

    // Get full video details
    const videoIds = searchResponse.data.items.map(item => item.id.videoId).join(',');
    const videosResponse = await youtube.get('/videos', {
      params: {
        id: videoIds,
        part: 'snippet,statistics'
      }
    });

    return {
      items: videosResponse.data.items,
      pageInfo: searchResponse.data.pageInfo,
      nextPageToken: searchResponse.data.nextPageToken
    };
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    throw error;
  }
};

export const getShortVideos = async (pageToken = '') => {
  try {
    console.log('Starting shorts fetch with pageToken:', pageToken);
    
    // Use videos endpoint instead of search to save quota
    const response = await youtube.get('/videos', {
      params: {
        part: 'snippet,contentDetails',
        chart: 'mostPopular',
        maxResults: 50, // Optimize response size
        videoCategoryId: '35', // Short-form content category
        regionCode: 'US',
        pageToken,
        fields: 'items(id,snippet,contentDetails),nextPageToken'
      }
    });

    if (!response.data.items?.length) {
      console.log('No videos found');
      return { items: [], nextPageToken: null };
    }

    // Filter for shorts
    const shorts = response.data.items
      .filter(video => {
        const duration = video.contentDetails.duration;
        const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
        const minutes = parseInt(match?.[2] || 0);
        const seconds = parseInt(match?.[3] || 0);
        const totalSeconds = minutes * 60 + seconds;

        // Check if it's a short (less than 60 seconds)
        return totalSeconds <= 60;
      })
      .map(video => ({
        ...video,
        statistics: { viewCount: '0', likeCount: '0' } // Add default statistics
      }));

    console.log('Processed shorts:', shorts.length);

    return {
      items: shorts,
      nextPageToken: response.data.nextPageToken
    };
  } catch (error) {
    console.error('Error fetching shorts:', error);
    if (error.response?.status === 403) {
      // If we hit the quota limit, try the backup method
      try {
        return await getBackupShorts(pageToken);
      } catch (backupError) {
        console.error('Backup method also failed:', backupError);
        throw new Error('Unable to load shorts. Please try again later.');
      }
    }
    throw error;
  }
};

// Backup method using less quota
const getBackupShorts = async (pageToken = '') => {
  const response = await youtube.get('/videos', {
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: 20,
      regionCode: 'US',
      pageToken,
      videoDuration: 'short'
    }
  });

  const shorts = response.data.items.map(video => ({
    id: video.id,
    snippet: video.snippet,
    contentDetails: {
      duration: 'PT60S' // Assume all are valid shorts
    },
    statistics: {
      viewCount: '0',
      likeCount: '0'
    }
  }));

  return {
    items: shorts,
    nextPageToken: response.data.nextPageToken
  };
};

// Add this new function to get channel details with subscriber count
export const getChannelWithStats = async (channelId) => {
  try {
    const response = await youtube.get('/channels', {
      params: {
        id: channelId,
        part: 'snippet,statistics',
        fields: 'items(snippet(thumbnails),statistics(subscriberCount))'
      }
    });
    return response.data.items[0];
  } catch (error) {
    console.error('Error fetching channel stats:', error);
    return null;
  }
};

// Add a fallback method using less quota
const fetchTrendingVideos = async () => {
  try {
    const response = await youtube.get('/videos', {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 20,
        regionCode: 'US',
        videoCategoryId: '0',
      }
    });

    return {
      items: response.data.items.map(video => ({
        ...video,
        statistics: { viewCount: '0', likeCount: '0' } // Add default statistics
      })),
      pageInfo: response.data.pageInfo
    };
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    return { items: [], pageInfo: { totalResults: 0, resultsPerPage: 0 } };
  }
}; 