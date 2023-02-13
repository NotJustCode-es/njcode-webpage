import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__proyectosFields } from '@server/models/contentful-content-types/section-proyectos';

@Component({
  selector: 'app-section-proyectos',
  templateUrl: './section-proyectos.component.html',
  styleUrls: ['./section-proyectos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionProyectosComponent {
  @Input() data!: TypeSection__proyectosFields;
}
