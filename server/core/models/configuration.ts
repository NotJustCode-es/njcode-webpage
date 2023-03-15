import { ClientConfiguration } from '@server/models/client-configuration';
import { ContentfulConfiguration } from './contentful-configuration';

export interface Configuration {
  port: number;
  prefix: string;
  contentful: ContentfulConfiguration
  client: ClientConfiguration
}
