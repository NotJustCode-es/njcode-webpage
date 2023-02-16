import { TypeContact__form__entryFields } from '@server/models/contentful-content-types/contact-form-entry';
import * as Contentful from 'contentful';

export interface TypeSection__contact__formFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  subtitle: Contentful.EntryFields.Symbol;
  regularEntries: Contentful.Entry<TypeContact__form__entryFields>[];
  messageEntry: Contentful.Entry<TypeContact__form__entryFields>;
  submitButton: Contentful.EntryFields.Symbol;
  requiredExplanation: Contentful.EntryFields.Symbol;
}

export type TypeSection__contact__form = Contentful.Entry<TypeSection__contact__formFields>;
