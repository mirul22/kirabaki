
import withPWAInit from "@ducanh2912/next-pwa";

const nextConfig = {
  // ... other options you like
};

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

// Export using the ES module syntax
export default withPWA({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  fallbacks: {
    document: "/offline", // if you want to fallback to a custom page rather than /_offline
  },
  workboxOptions: {
    disableDevLogs: true,
  },
  reactStrictMode: false,
  swcMinify: false,
  // ... other options you like
}, nextConfig);
