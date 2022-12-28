import * as Contentful from 'contentful';

export interface TypePageFields {
  name?: Contentful.EntryFields.Symbol;
  title?: Contentful.EntryFields.Symbol;
  slug: Contentful.EntryFields.Symbol;
  sections?: Contentful.Entry<Record<string, unknown>>[];
}

export type TypePage = Contentful.Entry<TypePageFields>;
