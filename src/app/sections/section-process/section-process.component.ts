import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__processFields } from '@server/models/contentful-content-types/section-process';

@Component({
  selector: 'app-section-process',
  templateUrl: './section-process.component.html',
  styleUrls: ['./section-process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionProcessComponent {
  @Input() data!: TypeSection__processFields;

  readonly iconsPath = 'assets/theme/img/icons/solid';

  readonly imgPath = 'assets/theme/img';

  getIconPath(icon: string): string {
    return `${this.iconsPath}/${icon}.svg`;
  }

  getImgPath(icon: string): string {
    return `${this.imgPath}/${icon}.jpg`;
  }
}
