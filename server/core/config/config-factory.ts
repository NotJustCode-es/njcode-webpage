import { Configuration } from '@server/core/models/configuration';

export default (): Configuration => ({
  port: parseInt(process.env['PORT'] || '4000', 10),
  prefix: process.env['PREFIX'] || '/api',
  contentful: {
    spaceId: process.env['CONTENTFUL_SPACE_ID'] || '',
    accessToken: process.env['CONTENTFUL_ACCESS_TOKEN'] || '',
    environment: process.env['CONTENTFUL_ENVIRONMENT'] || '',
  },
  client: {
    i18n: {
      defaultLang: process.env['DEFAULT_LANG'] || 'en',
      availableLangs: process.env['AVAILABLE_LANGS']?.split(',') || ['en'],
    },
    assetsUrl: process.env['ASSETS_URL'] || '',
    googleAnalyticsId: process.env['GOOGLE_ANALYTICS_ID'] || '',
    googleRecaptchaSiteKey: process.env['GOOGLE_RECAPTCHA_SITE_KEY'] || '',
  },
});
