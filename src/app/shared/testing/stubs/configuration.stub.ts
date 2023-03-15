import { ClientConfiguration } from '@server/models/client-configuration';

export class ConfiguracionStub {
  data: ClientConfiguration = {
    default_lang: 'es',
    available_lang: ['es', 'en'],
    asset_url: 'test',
    google_analytics_id: 'test',
    google_recaptcha_site_key: 'test',
  };
}
