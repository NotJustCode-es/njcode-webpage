import { TypeLogoFields } from '@server/models/contentful-content-types/logo';
import { TypeRouteLinkFields } from '@server/models/contentful-content-types/route-link';
import * as Contentful from 'contentful';

export interface TypeSection__footerFields {
  name: Contentful.EntryFields.Symbol;
  subtitle: Contentful.EntryFields.Symbol;
  rigths: Contentful.EntryFields.Symbol;
  phoneTitle: Contentful.EntryFields.Symbol;
  addressTitle: Contentful.EntryFields.Symbol;
  phoneNumbers: Contentful.EntryFields.Symbol[];
  adress: Contentful.EntryFields.Symbol;
  logo: Contentful.Entry<TypeLogoFields>;
  socialmedia: Contentful.Entry<TypeRouteLinkFields>[];
}

export type TypeSection__footer = Contentful.Entry<TypeSection__footerFields>;
