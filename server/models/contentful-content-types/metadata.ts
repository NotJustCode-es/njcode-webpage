import * as Contentful from 'contentful';

export interface TypeMetadataFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  description: Contentful.EntryFields.Symbol;
  keywords: Contentful.EntryFields.Symbol[];
  index?: Contentful.EntryFields.Boolean;
  follow?: Contentful.EntryFields.Boolean;
}

export type TypeMetadata = Contentful.Entry<TypeMetadataFields>;
