/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/projects/causalbench-llm-reasoning",
        destination: "/projects/causalitea",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
