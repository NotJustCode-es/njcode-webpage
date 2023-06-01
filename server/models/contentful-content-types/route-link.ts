import * as Contentful from 'contentful';

export interface TypeRouteLinkFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  href: Contentful.EntryFields.Symbol;
  external: Contentful.EntryFields.Boolean;
  targetBlank: Contentful.EntryFields.Boolean;
  rel?: Contentful.EntryFields.Symbol;
}

export type TypeRouteLink = Contentful.Entry<TypeRouteLinkFields>;
