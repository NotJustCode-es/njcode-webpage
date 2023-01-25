import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SectionHeroComponent } from '@sections/section-hero/section-hero.component';

@NgModule({
  declarations: [
    SectionHeroComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionHeroComponent,
  ],
})
export class SectionHeroModule {
  static component = SectionHeroComponent;
}
