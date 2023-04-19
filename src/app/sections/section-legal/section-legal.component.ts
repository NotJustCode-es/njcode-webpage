import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TypeSection__legalFields } from '@server/models/contentful-content-types/section-legal';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';

@Component({
  selector: 'app-section-legal',
  templateUrl: './section-legal.component.html',
  styleUrls: ['./section-legal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionLegalComponent {
  @Input() data!: TypeSection__legalFields;

  getRichTextAsHtml(richDocument: Document): string {
    return documentToHtmlString(richDocument);
  }

  getHref(sectionId: string): string {
    return `#${sectionId}`;
  }
}
