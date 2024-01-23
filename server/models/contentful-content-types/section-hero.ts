import { TypeLogoFields } from '@server/models/contentful-content-types/logo';
import * as Contentful from 'contentful';

export interface TypeSection__heroFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  description?: Contentful.EntryFields.Symbol;
  logo?: Contentful.Entry<TypeLogoFields>;
  body?: Contentful.EntryFields.Text
}

export type TypeSection__hero = Contentful.Entry<TypeSection__heroFields>;
