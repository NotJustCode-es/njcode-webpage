import * as Contentful from 'contentful';

export interface TypeSection__heroFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  description: Contentful.EntryFields.Symbol;
}

export type TypeSection__hero = Contentful.Entry<TypeSection__heroFields>;
