import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionNavbarComponent } from './section-navbar.component';

@NgModule({
  declarations: [
    SectionNavbarComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionNavbarComponent,
  ],
})
export class SectionNavbarModule {
  static component = SectionNavbarComponent;
}
