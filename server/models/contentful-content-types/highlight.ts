import * as Contentful from 'contentful';

export interface TypeHighlightFields {
  name: Contentful.EntryFields.Symbol;
  icon: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  description: Contentful.EntryFields.Text;
}

export type TypeHighlight = Contentful.Entry<TypeHighlightFields>;
