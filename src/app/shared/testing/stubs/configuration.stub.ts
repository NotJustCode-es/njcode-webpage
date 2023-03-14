import { FrontConfigurationParams } from '@server/models/front-configuration-params';

export class ConfiguracionStub {
  data: FrontConfigurationParams = {
    production: false,
    default_lang: 'es',
    available_lang: ['es', 'en'],
    asset_url: 'test',
    google_analytics_id: 'test',
    google_recaptcha_site_key: 'test',
  };
}
