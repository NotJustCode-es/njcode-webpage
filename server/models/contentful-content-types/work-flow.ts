import * as Contentful from 'contentful';

export interface TypeWorkflowFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  description: Contentful.EntryFields.Symbol;
  checklist: Contentful.EntryFields.Symbol[];
  workflowImage: Contentful.Asset;
}

export type TypeWorkflow = Contentful.Entry<TypeWorkflowFields>;
