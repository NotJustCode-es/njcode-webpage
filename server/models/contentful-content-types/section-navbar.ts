import { TypeDropdownFields } from '@server/models/contentful-content-types/dropdown';
import { TypeLogoFields } from '@server/models/contentful-content-types/logo';
import { TypeRouteLinkFields } from '@server/models/contentful-content-types/route-link';
import * as Contentful from 'contentful';

export interface TypeSection__navbarFields {
  name?: Contentful.EntryFields.Symbol;
  navbarLogo?: Contentful.Entry<TypeLogoFields>;
  links?: Contentful.Entry<TypeRouteLinkFields>[];
  contactLink?: Contentful.Entry<TypeRouteLinkFields>;
  dropdown?: Contentful.Entry<TypeDropdownFields>;
}

export type TypeSection__navbar = Contentful.Entry<TypeSection__navbarFields>;
