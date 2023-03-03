// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  i18n: {
    defaultLang: 'es',
    availableLangs: ['en', 'es'],
  },
  analytics: {
    googleAnalyticsId: 'G-6DENS4ZPR6',
  },
  hostUrl: 'http://localhost:4200',
  recaptcha: {
    siteKey: '6LcMZ6gkAAAAAPHKo_cruQWbIixX4sQS1b2BFo3a',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
