import * as Contentful from 'contentful';

export interface TypeSection__postsFields {
  name?: Contentful.EntryFields.Symbol;
  user: Contentful.EntryFields.Symbol;
}

export type TypeSection__posts = Contentful.Entry<TypeSection__postsFields>;
