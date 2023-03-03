import * as Contentful from 'contentful';

export interface TypeContact__form__entryFields {
  name: Contentful.EntryFields.Symbol;
  label: Contentful.EntryFields.Symbol;
  placeholder: Contentful.EntryFields.Symbol;
  validFeedback: Contentful.EntryFields.Symbol;
  invalidRequiredFeedback: Contentful.EntryFields.Symbol;
  invalidSizeFeedback?: Contentful.EntryFields.Symbol;
  invalidPatternFeedback?: Contentful.EntryFields.Symbol;
}

export type TypeContact__form__entry = Contentful.Entry<TypeContact__form__entryFields>;
