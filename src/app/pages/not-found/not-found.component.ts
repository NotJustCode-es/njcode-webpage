import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoutesEnum } from '@core/models/routes.enum';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  public routesEnum = RoutesEnum;
}
