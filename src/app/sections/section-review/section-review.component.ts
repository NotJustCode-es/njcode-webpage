import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TypeSection__reviewFields } from '@server/models/contentful-content-types/section-review';
import { AssetsService } from '@services/assets/assets.service';

@Component({
  selector: 'app-section-review',
  templateUrl: './section-review.component.html',
  styleUrls: ['./section-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionReviewComponent {
  @Input() data!: TypeSection__reviewFields;

  constructor(
    private assetsService: AssetsService,
  ) { }

  getIconPath(icon: string): string {
    return this.assetsService.getIconLinealPath(icon);
  }
}
