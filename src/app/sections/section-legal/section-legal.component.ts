import {
  ChangeDetectionStrategy, Component, Input,
} from '@angular/core';
import { TypeSection__legalFields } from '@server/models/contentful-content-types/section-legal';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-section-legal',
  templateUrl: './section-legal.component.html',
  styleUrls: ['./section-legal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionLegalComponent {
  @Input() data!: TypeSection__legalFields;

  constructor(
    private scroller: ViewportScroller,
  ) {}

  getRichTextAsHtml(richDocument: Document): string {
    return documentToHtmlString(richDocument);
  }
}
