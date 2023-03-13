/** @type {import('next').NextConfig} */

module.exports = {
  optimizeFonts: false,
  reactStrictMode: true,
  transpilePackages: ["0xpass"],
  images: {
    domains: ["storage.googleapis.com"],
  },
  async rewrites() {
    return [
      {
        source: "/webtoons/:webtoonId/:tabName",
        destination: "/webtoons/:webtoonId?tab=:tabName",
      },
      {
        source: "/webtoons/:webtoonId/episode/:episodeNumber/:languageName",
        destination:
          "/webtoons/:webtoonId/episode/:episodeNumber?language=:languageName",
      },
    ];
  },
};
