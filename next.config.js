// eslint-disable-next-line @typescript-eslint/no-var-requires
// const withPWA = require('next-pwa');

module.exports = {
  target: 'serverless',
  images: {
    domains: [
      'thesportsdb.com',
      'www.thesportsdb.com',
      'media.api-sports.io',
      'https://media.api-sports.io',
      'https://crests.football-data.org',
      'crests.football-data.org',
      'https://football-data.org',
      'football-data.org',
    ],
  },
};
