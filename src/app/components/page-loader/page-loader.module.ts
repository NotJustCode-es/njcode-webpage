import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageLoaderComponent } from '@components/page-loader/page-loader.component';

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
