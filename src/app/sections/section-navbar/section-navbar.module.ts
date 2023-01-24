import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SectionNavbarComponent } from '@sections/section-navbar/section-navbar.component';

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
