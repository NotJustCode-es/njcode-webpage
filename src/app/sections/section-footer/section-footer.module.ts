import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionFooterComponent } from './section-footer.component';

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
