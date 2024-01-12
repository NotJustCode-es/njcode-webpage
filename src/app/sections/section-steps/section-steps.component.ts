import { Component, Input } from '@angular/core';
import { TypeSection__stepsFields } from '@server/models/contentful-content-types/section-steps';
import { AssetsService } from '@services/assets/assets.service';

@Component({
  selector: 'app-section-steps',
  templateUrl: './section-steps.component.html',
  styleUrls: ['./section-steps.component.scss'],
})
export class SectionStepsComponent {
  @Input() data!: TypeSection__stepsFields;

  constructor(
    private assetsService: AssetsService,
  ) { }

  getIconPath(icon: string): string {
    return this.assetsService.getIconLinealPath(icon);
  }
}
