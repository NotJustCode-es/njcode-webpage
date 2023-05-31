import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkModule } from '@components/link/link.module';
import { SectionClientsComponent } from '@sections/section-clients/section-clients.component';

@NgModule({
  declarations: [
    SectionClientsComponent,
  ],
  imports: [
    CommonModule,
    LinkModule,
  ],
  exports: [
    SectionClientsComponent,
  ],
})
export class SectionClientsModule {
  static component = SectionClientsComponent;
}
