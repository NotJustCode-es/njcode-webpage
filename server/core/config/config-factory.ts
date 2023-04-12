import { Configuration } from '@server/core/models/configuration';

export default (): Configuration => ({
  port: parseInt(process.env['PORT'] || '4000', 10),
  prefix: process.env['PREFIX'] || '/api',
  hostname: process.env['HOSTNAME'] || 'http://localhost:4200',
  contentful: {
    spaceId: process.env['CONTENTFUL_SPACE_ID'] || '',
    accessToken: process.env['CONTENTFUL_ACCESS_TOKEN'] || '',
    environment: process.env['CONTENTFUL_ENVIRONMENT'] || '',
  },
  client: {
    assetsUrl: process.env['ASSETS_URL'] || '',
    googleAnalyticsId: process.env['GOOGLE_ANALYTICS_ID'] || '',
    googleRecaptchaSiteKey: process.env['GOOGLE_RECAPTCHA_SITE_KEY'] || '',
  },
});
