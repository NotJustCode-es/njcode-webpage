import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-footer',
  templateUrl: './section-footer.component.html',
  styleUrls: [
    './section-footer.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionFooterComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}
