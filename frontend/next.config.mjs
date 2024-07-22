// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// // next.config.js
// const withVideos = require('next-videos')

// module.exports = withVideos()


// next.config.mjs
import withVideos from 'next-videos';


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/blog",
  env: {
    backend:"http://localhost:4000"
  }
};

export default withVideos(nextConfig);
