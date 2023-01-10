import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { i18nRoutes } from '@core/models/i18n-routes';
import { RoutesEnum } from '@core/models/routes.enum';

const routes: Routes = [
  {
    path: RoutesEnum.NotFound,
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),
  },
  {
    path: RoutesEnum.Dynamic,
    loadChildren: () => import('./pages/dynamic-page/dynamic-page.module').then(m => m.DynamicPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(i18nRoutes(routes), {
      initialNavigation: 'enabledBlocking',
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'corrected',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
