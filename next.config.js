/** @type {import('next').NextConfig} */

const API_KEY = "d2b9817f48c3f041b5525978824be481";

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
        {
          source: "/contact",
          destination: "/form",
          permanent: false,
        }
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      }
    ]
  },
};

module.exports = nextConfig
