import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionProyectosComponent } from './section-proyectos.component';

@NgModule({
  declarations: [
    SectionProyectosComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionProyectosComponent,
  ],
})
export class SectionProyectosModule {
  static component = SectionProyectosComponent;
}
