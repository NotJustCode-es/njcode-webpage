import * as Contentful from 'contentful';

export interface TypeEntryFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  text: Contentful.EntryFields.Text;
}

export type TypeEntry = Contentful.Entry<TypeEntryFields>;
