import { Configuration } from '../models/configuration';

export default (): Configuration => ({
  port: parseInt(process.env['PORT'] || '3000', 10),
  prefix: process.env['PREFIX'] || '/api',
  contentful: {
    spaceId: process.env['CONTENTFUL_SPACE_ID'] || '',
    accessToken: process.env['CONTENTFUL_ACCESS_TOKEN'] || '',
    environment: process.env['CONTENTFUL_ENVIRONMENT'] || '',
  },
  client: {
    default_lang: process.env['DEFAULT_LANG'] || '',
    available_lang: process.env['AVAILABLE_LANG']?.split(' ') || [''],
    asset_url: process.env['ASSET_URL'] || '',
    google_analytics_id: process.env['GOOGLE_ANALYTCS_ID'] || '',
    google_recaptcha_site_key: process.env['GOOGLE_RECAPTCHA_SITE_KEY'] || '',
  },
});
