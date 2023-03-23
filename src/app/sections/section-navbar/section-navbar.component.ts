import {
  ChangeDetectionStrategy, Component, Input,
} from '@angular/core';
import { RoutesEnum } from '@core/models/routes.enum';
import { I18nService } from '@core/services/i18n/i18n.service';
import { TypeSection__navbarFields } from '@server/models/contentful-content-types/section-navbar';

@Component({
  selector: 'app-section-navbar',
  templateUrl: './section-navbar.component.html',
  styleUrls: ['./section-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionNavbarComponent {
  @Input() data!: TypeSection__navbarFields;

  routesEnum = RoutesEnum;

  constructor(
    private i18nService: I18nService,
  ) {}

  get availableLangs(): string[] {
    return this.i18nService.availableLanguages;
  }

  get activeLang(): string {
    return this.i18nService.activeLanguage;
  }

  setActiveLang(lang: string): void {
    this.i18nService.setActiveLanguage(lang);
  }
}
