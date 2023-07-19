import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '@components/dropdown/dropdown/dropdown.component';
import { LinkModule } from '@components/link/link.module';

@NgModule({
  declarations: [
    DropdownComponent,
  ],
  imports: [
    CommonModule,
    LinkModule,
  ],
  exports: [
    DropdownComponent,
  ],
})
export class DropdownModule { }
