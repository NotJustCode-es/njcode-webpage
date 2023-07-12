import { TypeWorkflowFields } from '@server/models/contentful-content-types/work-flow';
import * as Contentful from 'contentful';

export interface TypeSectionExplanationFields {
  name: Contentful.EntryFields.Symbol;
  explanation: Contentful.Entry<TypeWorkflowFields>;
  imageOnLeftSide: Contentful.EntryFields.Boolean;
}

export type TypeSection__explanation = Contentful.Entry<TypeSectionExplanationFields>;
