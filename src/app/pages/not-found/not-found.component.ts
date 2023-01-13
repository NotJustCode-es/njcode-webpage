import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoutesEnum } from '@core/models/routes.enum';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  get homeRoute(): string {
    return RoutesEnum.Home;
  }
}
