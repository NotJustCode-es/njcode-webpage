import * as Contentful from 'contentful';

export interface TypeContact__form__entryFields {
  name: Contentful.EntryFields.Symbol;
  label: Contentful.EntryFields.Symbol;
  placeholder: Contentful.EntryFields.Symbol;
  validFeedback: Contentful.EntryFields.Symbol;
  invalidFeedback: Contentful.EntryFields.Symbol;
}

export type TypeContact__form__entry =
  Contentful.Entry<TypeContact__form__entryFields>;
