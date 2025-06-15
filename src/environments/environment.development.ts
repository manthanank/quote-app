export const environment = {
  production: true,
  apiUrl:
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000/api/quote'
      : 'https://quote-app-api.vercel.app/api/quote',
  trackingApiUrl: 'https://visitor-tracking-api.vercel.app/api/visit',
};
