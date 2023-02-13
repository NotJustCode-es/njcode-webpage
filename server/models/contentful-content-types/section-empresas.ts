import * as Contentful from 'contentful';

export interface TypeSection__empresasFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  empresas: Contentful.Asset[];
}

export type TypeSection__empresas = Contentful.Entry<TypeSection__empresasFields>;
