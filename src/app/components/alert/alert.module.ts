import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [
    AlertComponent,
  ],
  imports: [
    CommonModule,
    NgbAlertModule,
  ],
  exports: [
    AlertComponent,
  ],
})
export class AlertModule { }
