import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkModule } from '@components/link/link.module';
import { SectionNavbarComponent } from '@sections/section-navbar/section-navbar.component';

@NgModule({
  declarations: [
    SectionNavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LinkModule,
  ],
  exports: [
    SectionNavbarComponent,
  ],
})
export class SectionNavbarModule {
  static component = SectionNavbarComponent;
}
