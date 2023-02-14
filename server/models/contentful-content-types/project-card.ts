import { TypeRouteLinkFields } from '@server/models/contentful-content-types/route-link';
import * as Contentful from 'contentful';

export interface TypeProjectCardFields {
  name: Contentful.EntryFields.Symbol;
  image: Contentful.Asset;
  title: Contentful.EntryFields.Symbol;
  subtitle: Contentful.EntryFields.Symbol;
  fullSizeImage: Contentful.Asset;
  projectLink: Contentful.Entry<TypeRouteLinkFields>;
}

export type TypeProjectCard = Contentful.Entry<TypeProjectCardFields>;
