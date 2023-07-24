import { TypeRouteLinkFields } from '@server/models/contentful-content-types/route-link';
import * as Contentful from 'contentful';

export interface TypeDropdownFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  links: Contentful.Entry<TypeRouteLinkFields>[];
}

export type TypeDropdown = Contentful.Entry<TypeDropdownFields>;
