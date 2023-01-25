import { TypeHighlightFields } from '@server/models/contentful-content-types/highlight';
import * as Contentful from 'contentful';

export interface TypeSection__highlightsFields {
  name: Contentful.EntryFields.Symbol;
  highlights: Contentful.Entry<TypeHighlightFields>[];
}

export type TypeSection__highlights = Contentful.Entry<TypeSection__highlightsFields>;
