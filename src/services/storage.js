const STORAGE_KEYS = {
  LIKED_VIDEOS: 'quantumtube_liked_videos',
  SUBSCRIPTIONS: 'quantumtube_subscriptions',
  HISTORY: 'quantumtube_history',
};

class StorageService {
  getLikedVideos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LIKED_VIDEOS) || '[]');
  }

  addLikedVideo(video) {
    const liked = this.getLikedVideos();
    if (!liked.find(v => v.id === video.id)) {
      const videoData = {
        id: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.high.url,
        channelTitle: video.snippet.channelTitle,
        viewCount: video.statistics.viewCount,
        publishedAt: video.snippet.publishedAt
      };
      liked.push(videoData);
      localStorage.setItem(STORAGE_KEYS.LIKED_VIDEOS, JSON.stringify(liked));
    }
  }

  removeLikedVideo(videoId) {
    const liked = this.getLikedVideos();
    const filtered = liked.filter(v => v.id !== videoId);
    localStorage.setItem(STORAGE_KEYS.LIKED_VIDEOS, JSON.stringify(filtered));
  }

  getSubscriptions() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS) || '[]');
  }

  addSubscription(channel) {
    const subs = this.getSubscriptions();
    if (!subs.find(s => s.id === channel.id)) {
      subs.push(channel);
      localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(subs));
    }
  }

  removeSubscription(channelId) {
    const subs = this.getSubscriptions();
    const filtered = subs.filter(s => s.id !== channelId);
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTIONS, JSON.stringify(filtered));
  }

  getHistory() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.HISTORY) || '[]');
  }

  addToHistory(video) {
    const history = this.getHistory();
    // Remove if exists to avoid duplicates
    const filtered = history.filter(v => v.id !== video.id);
    // Add to beginning of array with complete data
    filtered.unshift({
      id: video.id,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      channelTitle: video.snippet.channelTitle,
      viewCount: video.statistics.viewCount,
      publishedAt: video.snippet.publishedAt
    });
    // Keep only last 100 videos
    const trimmed = filtered.slice(0, 100);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmed));
  }

  clearHistory() {
    localStorage.setItem(STORAGE_KEYS.HISTORY, '[]');
  }
}

export const storageService = new StorageService(); 