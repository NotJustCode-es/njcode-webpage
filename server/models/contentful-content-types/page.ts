import { TypeMetadataFields } from '@server/models/contentful-content-types/metadata';
import * as Contentful from 'contentful';

export interface TypePageFields {
  name?: Contentful.EntryFields.Symbol;
  slug: Contentful.EntryFields.Symbol;
  metadata?: Contentful.Entry<TypeMetadataFields>;
  sections?: Contentful.Entry<Record<string, unknown>>[];
}

export type TypePage = Contentful.Entry<TypePageFields>;
