import { TypeHighlightFields } from '@server/models/contentful-content-types/highlight';
import * as Contentful from 'contentful';

export interface TypeSection__reviewFields {
  name: Contentful.EntryFields.Symbol;
  image?: Contentful.Asset;
  cards: Contentful.Entry<TypeHighlightFields>[];
}

export type TypeSection__review = Contentful.Entry<TypeSection__reviewFields>;
