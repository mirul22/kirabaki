
import withPWA from "@ducanh2912/next-pwa";

const nextConfig = {
  // ... other options you like
};

// Export using the ES module syntax
export default withPWA({
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  dest: "public",
  fallbacks: {
    document: "/offline", // if you want to fallback to a custom page rather than /_offline
  },
  workboxOptions: {
    disableDevLogs: true,
  },
  // ... other options you like
}, nextConfig);
