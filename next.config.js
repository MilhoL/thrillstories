/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Prepared for future AI-generated cover images
    remotePatterns: [
      { protocol: "https", hostname: "oaidalleapiprodscus.blob.core.windows.net" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  // ISR revalidation is handled per-page
};

module.exports = nextConfig;
