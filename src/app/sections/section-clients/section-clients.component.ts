import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TypeSection__clientsFields } from '@server/models/contentful-content-types/section-clients';

@Component({
  selector: 'app-section-clients',
  templateUrl: './section-clients.component.html',
  styleUrls: ['./section-clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionClientsComponent {
  @Input() data!: TypeSection__clientsFields;

  readonly iconsPath = 'assets/theme/img/icons/solid';

  readonly imgPath = 'assets/theme/img';

  getIconPath(icon: string): string {
    return `${this.iconsPath}/${icon}.svg`;
  }

  getImgPath(icon: string): string {
    return `${this.imgPath}/${icon}.png`;
  }
}
