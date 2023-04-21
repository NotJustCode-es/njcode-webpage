import {
  AfterViewInit, ChangeDetectionStrategy, Component, TemplateRef, ViewChild,
} from '@angular/core';
import { RoutesEnum } from '@core/models/routes.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '@services/storage/storage.service';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieBannerComponent implements AfterViewInit {
  readonly cookiesKey = 'cookies';

  routesEnum = RoutesEnum;

  cookieExists = true;

  @ViewChild('cookieBanner', { static: true }) cookieBanner!: TemplateRef<Object>;

  constructor(
    private storageService: StorageService,
    private modalService: NgbModal,
  ) {}

  ngAfterViewInit(): void {
    this.checkCookies();
  }

  closeBanner(): void {
    this.storageService.setValue(this.cookiesKey, true);
    this.modalService.dismissAll();
  }

  open(): void {
    this.modalService.open(this.cookieBanner, {
      backdrop: false,
    });
  }

  private checkCookies(): void {
    if (!this.storageService.getValue<boolean>(this.cookiesKey)) {
      this.open();
    }
  }
}
