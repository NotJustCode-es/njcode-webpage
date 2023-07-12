import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TypeWorkflowFields } from '@server/models/contentful-content-types/work-flow';

@Component({
  selector: 'app-work-flow',
  templateUrl: './work-flow.component.html',
  styleUrls: ['./work-flow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkFlowComponent {
  @Input() data!: TypeWorkflowFields;

  @Input() imageOnLeftSide = true;
}
