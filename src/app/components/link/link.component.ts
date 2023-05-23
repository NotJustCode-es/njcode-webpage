import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { I18nService } from '@core/services/i18n/i18n.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LinkComponent {
  @Input() href!: string;

  @Input() className?: string[];

  @Input() title!: string;

  @Input() i18n = true;

  constructor(
    private i18nService: I18nService,
  ) {}

  get i18nBasedHref(): string {
    return this.i18n ? `/${this.i18nService.activeLanguage}/${this.href}` : `/${this.href}`;
  }
}
