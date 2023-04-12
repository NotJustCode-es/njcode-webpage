import { Configuration } from '@server/core/models/configuration';

export class configServiceStub {
  config: Configuration = {
    port: 4000,
    prefix: '/api',
    hostname: 'http://localhost:4200',
    contentful: {
      spaceId: 'spaceId',
      accessToken: 'accessToken',
      environment: 'environment',
    },
    client: {
      assetsUrl: 'assetsUrl',
      googleAnalyticsId: 'googleAnalyticsId',
      googleRecaptchaSiteKey: 'googleRecaptchaSiteKey',
    },
  };

  get<T>(key: string): T {
    return (this.config[key as keyof Configuration] as unknown) as T;
  }
}
