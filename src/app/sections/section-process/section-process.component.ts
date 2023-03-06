import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__processFields } from '@server/models/contentful-content-types/section-process';
import { AssetsService } from '@services/assets/assets.service';

@Component({
  selector: 'app-section-process',
  templateUrl: './section-process.component.html',
  styleUrls: ['./section-process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionProcessComponent {
  @Input() data!: TypeSection__processFields;

  constructor(
    private assetService: AssetsService,
  ) { }

  getIconPath(icon: string): string {
    return this.assetService.getIconSolidPath(icon);
  }
}
