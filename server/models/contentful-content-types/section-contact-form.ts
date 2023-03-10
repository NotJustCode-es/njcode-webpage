import { TypeContact__form__entryFields } from '@server/models/contentful-content-types/contact-form-entry';
import * as Contentful from 'contentful';

export interface TypeSection__contact__formFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  subtitle: Contentful.EntryFields.Symbol;
  firstNameEntry: Contentful.Entry<TypeContact__form__entryFields>;
  lastNameEntry: Contentful.Entry<TypeContact__form__entryFields>;
  mailEntry: Contentful.Entry<TypeContact__form__entryFields>;
  messageEntry: Contentful.Entry<TypeContact__form__entryFields>;
  requiredExplanation: Contentful.EntryFields.Symbol;
  submitButton: Contentful.EntryFields.Symbol;
  successfullySend: Contentful.EntryFields.Symbol;
  errorSend: Contentful.EntryFields.Symbol;
}

export type TypeSection__contact__form = Contentful.Entry<TypeSection__contact__formFields>;
