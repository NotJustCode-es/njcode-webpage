import * as Contentful from 'contentful';
import { TypeMetadataFields } from './metadata';

export interface TypePageFields {
  name?: Contentful.EntryFields.Symbol;
  title?: Contentful.EntryFields.Symbol;
  slug: Contentful.EntryFields.Symbol;
  sections?: Contentful.Entry<Record<string, unknown>>[];
  metadata?: Contentful.Entry<TypeMetadataFields>;
}

export type TypePage = Contentful.Entry<TypePageFields>;
