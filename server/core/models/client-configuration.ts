export interface ClientConfiguration {
  i18n: ClientConfigurationI18n;
  assetsUrl: string;
  googleAnalyticsId: string;
  googleRecaptchaSiteKey: string;
}

export interface ClientConfigurationI18n {
  defaultLang: string;
  availableLangs: string[];
}
