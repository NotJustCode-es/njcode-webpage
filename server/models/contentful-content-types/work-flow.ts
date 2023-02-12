import * as Contentful from 'contentful';
import { TypeRouteLinkFields } from '@server/models/contentful-content-types/route-link';

export interface TypeWorkflowFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  description: Contentful.EntryFields.Symbol;
  checklist: Contentful.EntryFields.Symbol[];
  learnMore?: Contentful.Entry<TypeRouteLinkFields>;
  icon: Contentful.EntryFields.Symbol;
}

export type TypeWorkflow = Contentful.Entry<TypeWorkflowFields>;
