/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_ALPHA_VANTAGE: process.env.REACT_APP_ALPHA_VANTAGE,
    REACT_APP_COMMODITIES_API: process.env.REACT_APP_COMMODITIES_API,
    REACT_APP_FIREBASE_API_KEY: process.env.REACT_APP_FIREBASE_API_KEY,
    REACT_APP_AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID: process.env.REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID: process.env.REACT_APP_APP_ID,
    REACT_APP_MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID,
  },
};

module.exports = nextConfig;
