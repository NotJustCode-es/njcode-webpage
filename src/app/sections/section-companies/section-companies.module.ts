import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionCompaniesComponent } from './section-companies.component';

@NgModule({
  declarations: [
    SectionCompaniesComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionCompaniesComponent,
  ],
})
export class SectionCompaniesModule {
  static component = SectionCompaniesComponent;
}
