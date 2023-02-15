import * as Contentful from 'contentful';
import { TypeHighlightFields } from '@server/models/contentful-content-types/highlight';
import { TypeWorkflowFields } from '@server/models/contentful-content-types/work-flow';

export interface TypeSection__processFields {
  name: Contentful.EntryFields.Symbol;
  question: Contentful.EntryFields.Symbol;
  answer: Contentful.EntryFields.Symbol;
  highligths?: Contentful.Entry<TypeHighlightFields>[];
  flow?: Contentful.Entry<TypeWorkflowFields>;
}

export type TypeSection__process = Contentful.Entry<TypeSection__processFields>;
