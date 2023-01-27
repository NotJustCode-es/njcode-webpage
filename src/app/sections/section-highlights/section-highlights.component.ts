import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__highlightsFields } from '@server/models/contentful-content-types/section-highlights';

@Component({
  selector: 'app-section-highlights',
  templateUrl: './section-highlights.component.html',
  styleUrls: ['./section-highlights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHighlightsComponent {
  @Input() data!: TypeSection__highlightsFields;

  readonly iconsPath = 'assets/theme/img/icons/solid';

  getIconPath(icon: string): string {
    return `${this.iconsPath}/${icon}.svg`;
  }
}
