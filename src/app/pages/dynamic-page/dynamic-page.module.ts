import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicLoadModule } from '@core/directives/dynamic-load/dynamic-load.module';
import { DynamicPageRoutingModule } from '@pages/dynamic-page/dynamic-page-routing.module';
import { DynamicPageComponent } from '@pages/dynamic-page/dynamic-page.component';

@NgModule({
  declarations: [
    DynamicPageComponent,
  ],
  imports: [
    CommonModule,
    DynamicPageRoutingModule,
    DynamicLoadModule,
  ],
})
export class DynamicPageModule {}
