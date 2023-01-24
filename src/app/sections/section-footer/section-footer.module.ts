import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SectionFooterComponent } from '@sections/section-footer/section-footer.component';

@NgModule({
  declarations: [
    SectionFooterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SectionFooterComponent,
  ],
})
export class SectionFooterModule {
  static component = SectionFooterComponent;
}
