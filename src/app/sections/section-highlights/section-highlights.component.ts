import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__highlightsFields } from '@server/models/contentful-content-types/section-highlights';
import { AssetsService } from '@services/assets/assets.service';

@Component({
  selector: 'app-section-highlights',
  templateUrl: './section-highlights.component.html',
  styleUrls: ['./section-highlights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHighlightsComponent {
  @Input() data!: TypeSection__highlightsFields;

  constructor(
    private assetsService: AssetsService,
  ) { }

  getIconPath(icon: string): string {
    return this.assetsService.getIconSolidPath(icon);
  }
}
