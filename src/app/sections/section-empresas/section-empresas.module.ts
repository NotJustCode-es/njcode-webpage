import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionEmpresasComponent } from './section-empresas.component';

@NgModule({
  declarations: [
    SectionEmpresasComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionEmpresasComponent,
  ],
})
export class SectionEmpresasModule {
  static component = SectionEmpresasComponent;
}
