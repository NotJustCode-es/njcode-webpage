import {
  ChangeDetectionStrategy, Component, Input, OnInit,
} from '@angular/core';

@Component({
  selector: 'app-section-navbar',
  templateUrl: './section-navbar.component.html',
  styleUrls: [
    './section-navbar.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionNavbarComponent implements OnInit {
  @Input() data!: any;

  constructor() { }

  ngOnInit(): void {
  }
}
