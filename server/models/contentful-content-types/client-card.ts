import { TypeRouteLinkFields } from '@server/models/contentful-content-types/route-link';
import * as Contentful from 'contentful';

export interface TypeClient__cardFields {
  name: Contentful.EntryFields.Symbol;
  clientName: Contentful.EntryFields.Symbol;
  position: Contentful.EntryFields.Symbol;
  description: Contentful.EntryFields.Symbol;
  socialMedia?: Contentful.Entry<TypeRouteLinkFields>[];
  clientPhoto: Contentful.Asset;
}

export type TypeClient__card = Contentful.Entry<TypeClient__cardFields>;
