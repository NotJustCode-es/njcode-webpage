import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionClientsComponent } from './section-clients.component';

@NgModule({
  declarations: [
    SectionClientsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionClientsComponent,
  ],
})
export class SectionClientsModule {
  static component = SectionClientsComponent;
}
