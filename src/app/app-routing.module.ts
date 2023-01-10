import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesEnum } from '@core/models/routes.enum';

const routes: Routes = [
  {
    path: RoutesEnum.NotFound,
    loadChildren: () => import('./pages/not-found/not-found-routing.module').then(m => m.NotFoundRoutingModule),
  },
  {
    path: '**',
    loadChildren: () => import('./pages/dynamic-page/dynamic-page.module').then(m => m.DynamicPageModule),
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'corrected',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [
    RouterModule,
  ],
  declarations: [
  ],
})
export class AppRoutingModule { }
