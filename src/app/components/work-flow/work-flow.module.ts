import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkFlowComponent } from '@components/work-flow/work-flow.component';

@NgModule({
  declarations: [
    WorkFlowComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    WorkFlowComponent,
  ],
})
export class WorkFlowModule { }
