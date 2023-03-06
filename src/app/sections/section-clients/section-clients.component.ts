import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TypeSection__clientsFields } from '@server/models/contentful-content-types/section-clients';
import { AssetsService } from '@services/assets/assets.service';

@Component({
  selector: 'app-section-clients',
  templateUrl: './section-clients.component.html',
  styleUrls: ['./section-clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionClientsComponent {
  @Input() data!: TypeSection__clientsFields;

  constructor(
    private assetsService: AssetsService,
  ) { }

  getIconPath(icon: string): string {
    return this.assetsService.getIconSolidPath(icon);
  }
}
