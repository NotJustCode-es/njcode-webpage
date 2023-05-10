import * as Contentful from 'contentful';

export interface TypeSection__projectFields {
  name: Contentful.EntryFields.Symbol;
  title: Contentful.EntryFields.Symbol;
  needsTitle: Contentful.EntryFields.Symbol;
  needsText: Contentful.EntryFields.Symbol;
  resultTitle: Contentful.EntryFields.Symbol;
  resultText: Contentful.EntryFields.Symbol;
  deedsTitle: Contentful.EntryFields.Symbol;
  deedsText: Contentful.EntryFields.Symbol;
  badgesTitle: Contentful.EntryFields.Symbol;
  badges: Contentful.EntryFields.Array<Contentful.EntryFields.Symbol>[];
  projectImage?: Contentful.Asset;
  imageOnLeftSide: Contentful.EntryFields.Boolean;
}
export type TypeSection__project = Contentful.Entry<TypeSection__projectFields>;
