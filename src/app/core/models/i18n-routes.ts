import { Routes } from '@angular/router';

export function i18nRoutes(children: Routes): Routes {
  return [
    {
      path: '',
      children,
    },
  ];
}
