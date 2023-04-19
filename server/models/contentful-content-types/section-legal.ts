import * as Contentful from 'contentful';
import { TypeLegal__entryFields } from '@server/models/contentful-content-types/legal-entry';

export interface TypeSection__legalFields {
  name?: Contentful.EntryFields.Symbol;
  legalEntries: Contentful.Entry<TypeLegal__entryFields>[];
}

export type TypeSection__legal = Contentful.Entry<TypeSection__legalFields>;
