/** @type {import('next').NextConfig} */

module.exports = {
  optimizeFonts: false,
  reactStrictMode: true,
  images: {
    domains: ["storage.googleapis.com"],
  },
  async rewrites() {
   return [
     {
       source: '/webtoons/:webtoonId/:tabName',
       destination: '/webtoons/:webtoonId?tab=:tabName'
     },
   ]
  },
};
