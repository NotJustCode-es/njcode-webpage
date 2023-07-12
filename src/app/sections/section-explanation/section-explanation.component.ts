import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TypeSectionExplanationFields } from '@server/models/contentful-content-types/section-explanation';

@Component({
  selector: 'app-section-explanation',
  templateUrl: './section-explanation.component.html',
  styleUrls: ['./section-explanation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionExplanationComponent {
  @Input() data!: TypeSectionExplanationFields;
}
