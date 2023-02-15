import * as Contentful from 'contentful';

export interface TypeSection__companiesFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  companies: Contentful.Asset[];
}

export type TypeSection__companies = Contentful.Entry<TypeSection__companiesFields>;
