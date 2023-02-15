import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__companiesFields } from '@server/models/contentful-content-types/section-companies';

@Component({
  selector: 'app-section-companies',
  templateUrl: './section-companies.component.html',
  styleUrls: ['./section-companies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionCompaniesComponent {
  @Input() data!: TypeSection__companiesFields;
}
