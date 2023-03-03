import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__projectsFields } from '@server/models/contentful-content-types/section-projects';

@Component({
  selector: 'app-section-projects',
  templateUrl: './section-projects.component.html',
  styleUrls: ['./section-projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionProjectsComponent {
  @Input() data!: TypeSection__projectsFields;
}
