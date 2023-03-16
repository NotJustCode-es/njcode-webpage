import {
  ChangeDetectionStrategy, Component,
} from '@angular/core';
import { AlertService } from '@services/alert/alert.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  readonly alertClearDelay = 5000;

  alert$ = this.alertService.alert$.pipe(
    tap(() => {
      setTimeout(() => {
        this.alertService.clearMessage();
      }, this.alertClearDelay);
    }),
  );

  constructor(
    private alertService: AlertService,
  ) {}
}
