export const GOOGLE_CONFIG = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  apiKey: import.meta.env.VITE_YOUTUBE_API_KEY,
  scope: `
    https://www.googleapis.com/auth/youtube.readonly
    https://www.googleapis.com/auth/youtube.force-ssl
    https://www.googleapis.com/auth/userinfo.profile
    https://www.googleapis.com/auth/userinfo.email
  `.trim().replace(/\s+/g, ' '),
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
};

// Add this for debugging
console.log('Google Config:', {
  ...GOOGLE_CONFIG,
  clientId: GOOGLE_CONFIG.clientId ? 'present' : 'missing',
  apiKey: GOOGLE_CONFIG.apiKey ? 'present' : 'missing'
}); 