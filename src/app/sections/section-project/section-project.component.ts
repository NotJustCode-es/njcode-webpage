import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__projectFields } from '@server/models/contentful-content-types/section-project';

@Component({
  selector: 'app-section-project',
  templateUrl: './section-project.component.html',
  styleUrls: ['./section-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionProjectComponent {
  @Input() data!: TypeSection__projectFields;
}
