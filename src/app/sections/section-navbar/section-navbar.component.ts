import {
  ChangeDetectionStrategy, Component, Input,
} from '@angular/core';
import { TypeSection__navbarFields } from '@server/models/contentful-content-types/section-navbar';

@Component({
  selector: 'app-section-navbar',
  templateUrl: './section-navbar.component.html',
  styleUrls: [
    './section-navbar.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionNavbarComponent {
  @Input() data!: TypeSection__navbarFields;
}
