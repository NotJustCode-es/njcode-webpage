import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SectionNavbarComponent } from '@sections/section-navbar/section-navbar.component';

@NgModule({
  declarations: [
    SectionNavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SectionNavbarComponent,
  ],
})
export class SectionNavbarModule {
  static component = SectionNavbarComponent;
}
