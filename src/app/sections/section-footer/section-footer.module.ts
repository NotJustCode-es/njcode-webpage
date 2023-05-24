import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LinkModule } from '@components/link/link.module';
import { SectionFooterComponent } from '@sections/section-footer/section-footer.component';

@NgModule({
  declarations: [
    SectionFooterComponent,
  ],
  imports: [
    CommonModule,
    LinkModule,
  ],
  exports: [
    SectionFooterComponent,
  ],
})
export class SectionFooterModule {
  static component = SectionFooterComponent;
}
