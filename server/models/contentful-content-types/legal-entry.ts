import * as Contentful from 'contentful';

export interface TypeLegal__entryFields {
  name?: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  description: Contentful.EntryFields.Text;
  checkPoints?: Contentful.EntryFields.Symbol[];
  body: Contentful.EntryFields.RichText;
}

export type TypeLegal__entry = Contentful.Entry<TypeLegal__entryFields>;
