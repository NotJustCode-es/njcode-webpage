import { TypeProjectCardFields } from '@server/models/contentful-content-types/project-card';
import * as Contentful from 'contentful';

export interface TypeSection__projectsFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  projectCards: Contentful.Entry<TypeProjectCardFields>[];
  description: Contentful.EntryFields.Symbol;
}

export type TypeSection__projects = Contentful.Entry<TypeSection__projectsFields>;
