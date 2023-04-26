import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy, Component, Inject, PLATFORM_ID,
} from '@angular/core';
import { RoutesEnum } from '@core/models/routes.enum';
import { StorageService } from '@services/storage/storage.service';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieBannerComponent {
  readonly cookiesKey = 'cookies';

  routesEnum = RoutesEnum;

  constructor(
    private storageService: StorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  closeBanner(): void {
    this.storageService.setValue(this.cookiesKey, true);
  }

  get showCookies(): boolean {
    return !!((!this.storageService.getValue<boolean>(this.cookiesKey) && isPlatformBrowser(this.platformId)));
  }
}
