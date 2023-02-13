import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__empresasFields } from '@server/models/contentful-content-types/section-empresas';

@Component({
  selector: 'app-section-empresas',
  templateUrl: './section-empresas.component.html',
  styleUrls: ['./section-empresas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionEmpresasComponent {
  @Input() data!: TypeSection__empresasFields;
}
