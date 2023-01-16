import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicPageComponent } from './dynamic-page.component';

const routes: Routes = [
  {
    path: '',
    component: DynamicPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class DynamicPageRoutingModule {
}
