import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__footerFields } from '@server/models/contentful-content-types/section-footer';

@Component({
  selector: 'app-section-footer',
  templateUrl: './section-footer.component.html',
  styleUrls: [
    './section-footer.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionFooterComponent {
  @Input() data!: TypeSection__footerFields;
}
