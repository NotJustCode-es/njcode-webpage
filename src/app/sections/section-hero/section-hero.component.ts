import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__heroFields } from '@server/models/contentful-content-types/hero';

@Component({
  selector: 'app-section-hero',
  templateUrl: './section-hero.component.html',
  styleUrls: ['./section-hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeroComponent {
  @Input() data!: TypeSection__heroFields;
}
