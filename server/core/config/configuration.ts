import { Configuration } from '../models/configuration';

export default (): Configuration => ({
  port: parseInt(process.env['PORT'] || '3000', 10),
  prefix: process.env['PREFIX'] || '/api',
  contentful: {
    url: process.env['CONTENTFUL_URL'] || '',
    spaceId: process.env['CONTENTFUL_SPACE_ID'] || '',
    accessToken: process.env['CONTENTFUL_ACCESS_TOKEN'] || '',
    environment: process.env['CONTENTFUL_ENVIRONMENT'] || '',
  },
});
