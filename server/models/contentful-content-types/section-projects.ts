import { TypeProjectCardFields } from '@server/models/contentful-content-types/project-card';
import * as Contentful from 'contentful';

export interface TypeSection__projectsFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  projectCards: Contentful.Entry<TypeProjectCardFields>[];
  descriptionInitialPart: Contentful.EntryFields.Symbol;
  descriptionUnderlinedWord: Contentful.EntryFields.Symbol;
  descriptionLastPart: Contentful.EntryFields.Symbol;
}

export type TypeSection__projects = Contentful.Entry<TypeSection__projectsFields>;
