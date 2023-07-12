import * as Contentful from 'contentful';

export interface TypeEntryFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  body: Contentful.EntryFields.Symbol;
}

export type TypeEntry = Contentful.Entry<TypeEntryFields>;
