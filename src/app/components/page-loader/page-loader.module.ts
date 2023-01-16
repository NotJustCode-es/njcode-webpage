import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoaderComponent } from './page-loader.component';

@NgModule({
  declarations: [
    PageLoaderComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PageLoaderComponent,
  ],
})
export class PageLoaderModule { }
