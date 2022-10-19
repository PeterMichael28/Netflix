/** @type {import('next').NextConfig} */
module.exports = {
 reactStrictMode: true,
 images: {
//   domains: ["image.tmdb.org"],
  remotePatterns: [
   {
    protocol: "https",
    hostname: "image.tmdb.org",
   },
  ],
 },
};
