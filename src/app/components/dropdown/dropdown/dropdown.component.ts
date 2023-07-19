import {
  ChangeDetectionStrategy, Component, Input,
} from '@angular/core';
import { TypeDropdownFields } from '@server/models/contentful-content-types/dropdown';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  @Input() data!: TypeDropdownFields;
}
