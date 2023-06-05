import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '@core/services/i18n/i18n.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent {
  @Input() href!: string;

  @Input() className?: string;

  @Input() title?: string;

  @Input() i18n = true;

  @Input() external!: boolean;

  @Input() targetBlank!: boolean;

  @Input() rel?: string;

  constructor(
    private router: Router,
    private i18nService: I18nService,
  ) {}

  get i18nBasedHref(): string {
    const href = this.href || '';
    const hrefWithoutSlash = href.replace(/^\//, '');
    return this.i18n ? `/${this.i18nService.activeLanguage}/${hrefWithoutSlash}` : hrefWithoutSlash;
  }

  onClickLink(event: MouseEvent): void {
    if (this.external) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.router.navigate([this.i18nBasedHref]);
  }
}
