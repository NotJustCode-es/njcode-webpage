import { TypeHighlightFields } from '@server/models/contentful-content-types/highlight';
import * as Contentful from 'contentful';

export interface TypeSection__stepsFields {
  image?: Contentful.Asset;
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  description: Contentful.EntryFields.Symbol;
  foreword: Contentful.EntryFields.Symbol;
  steps: Contentful.Entry<TypeHighlightFields>[];
}

export type TypeSection__steps = Contentful.Entry<TypeSection__stepsFields>;
