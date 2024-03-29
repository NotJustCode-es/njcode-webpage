import { ClientConfiguration } from '@server/core/models/client-configuration';
import { ContentfulConfiguration } from '@server/core/models/contentful-configuration';

export interface Configuration {
  port: number;
  prefix: string;
  hostname: string;
  contentful: ContentfulConfiguration;
  client: ClientConfiguration;
}
