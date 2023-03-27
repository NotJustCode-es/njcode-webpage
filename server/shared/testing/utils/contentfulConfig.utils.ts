import { ContentfulConfiguration } from '@server/core/models/contentful-configuration';

export function contentfulConfig(): ContentfulConfiguration {
  const response = {
    spaceId: 'test',
    accessToken: 'test',
    environment: 'test',
  };
  return response;
}
