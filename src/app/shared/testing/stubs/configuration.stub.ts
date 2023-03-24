import { ClientConfiguration } from '@server/core/models/client-configuration';
import { Observable, of } from 'rxjs';

export class ConfigurationServiceStub {
  configuration: ClientConfiguration = {
    assetsUrl: 'test',
    googleAnalyticsId: 'test',
    googleRecaptchaSiteKey: 'test',
  };

  get configurationData(): ClientConfiguration {
    return this.configuration;
  }

  get configurationData$(): Observable<ClientConfiguration> {
    return of(this.configuration);
  }
}
