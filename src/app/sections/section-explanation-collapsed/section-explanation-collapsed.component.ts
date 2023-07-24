import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TypeSection__explanation__collapsedFields } from '@server/models/contentful-content-types/section-explanation-collapsed';

@Component({
  selector: 'app-section-explanation-collapsed',
  templateUrl: './section-explanation-collapsed.component.html',
  styleUrls: ['./section-explanation-collapsed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionExplanationCollapsedComponent {
  @Input() data!: TypeSection__explanation__collapsedFields;

  getTitleWithPad(title: string): string {
    return `#${title}`;
  }
}
