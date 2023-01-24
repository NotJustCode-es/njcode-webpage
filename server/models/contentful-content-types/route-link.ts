import * as Contentful from 'contentful';

export interface TypeRouteLinkFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  href: Contentful.EntryFields.Symbol;
}

export type TypeRouteLink = Contentful.Entry<TypeRouteLinkFields>;
