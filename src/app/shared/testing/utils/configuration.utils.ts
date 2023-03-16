import { ClientConfiguration } from '@server/core/models/client-configuration';

export function createTestClientConfiguration(): ClientConfiguration {
  const response = {
    i18n: {
      defaultLang: 'en',
      availableLangs: ['es', 'en'],
    },
    assetsUrl: 'test',
    googleAnalyticsId: 'test',
    googleRecaptchaSiteKey: 'test',
  };
  return response;
}
