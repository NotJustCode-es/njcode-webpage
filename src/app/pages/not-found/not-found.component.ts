import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RoutesEnum } from '@core/models/routes.enum';
import { TranslocoService } from '@ngneat/transloco';
import { AssetsService } from '@services/assets/assets.service';

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

  get notFoundImgPath(): string {
    return this.assetsService.getImgPath('404.png');
  }

  get currentLanguage(): string {
    return this.translocoService.getActiveLang();
  }

  constructor(
    private assetsService: AssetsService,
    private translocoService: TranslocoService,
  ) {}
}
