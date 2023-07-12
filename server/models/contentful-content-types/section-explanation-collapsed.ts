import { TypeEntryFields } from '@server/models/contentful-content-types/entry';
import * as Contentful from 'contentful';

export interface TypeSection__explanation__collapsedFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  entries: Contentful.Entry<TypeEntryFields>[];
  image?: Contentful.Asset;
}

export type TypeSection__explanation_collapsed = Contentful.Entry<TypeSection__explanation__collapsedFields>;
