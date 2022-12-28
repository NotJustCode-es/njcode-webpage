import * as Contentful from 'contentful';

export interface TypeSection__navbarFields {
  name?: Contentful.EntryFields.Symbol;
  logo?: Contentful.Asset;
  links?: Contentful.EntryFields.Object;
}

export type TypeSection__navbar = Contentful.Entry<TypeSection__navbarFields>;
