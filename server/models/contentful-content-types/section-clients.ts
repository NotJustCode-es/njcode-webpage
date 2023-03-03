import { TypeClient__cardFields } from '@server/models/contentful-content-types/client-card';
import * as Contentful from 'contentful';

export interface TypeSection__clientsFields {
  name: Contentful.EntryFields.Symbol;
  icon: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  clientCards: Contentful.Entry<TypeClient__cardFields>[];
}

export type TypeSection__clients = Contentful.Entry<TypeSection__clientsFields>;
