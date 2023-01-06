import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { i18nRoutes } from '@core/models/i18n-routes';

const routes: Routes = [
  {
    path: '**',
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
