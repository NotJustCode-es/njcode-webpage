import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__legalFields } from '@server/models/contentful-content-types/section-legal';

@Component({
  selector: 'app-section-legal',
  templateUrl: './section-legal.component.html',
  styleUrls: ['./section-legal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionLegalComponent {
  @Input() data!: TypeSection__legalFields;
}
