import * as Contentful from 'contentful';

export interface TypeLogoFields {
  name: Contentful.EntryFields.Symbol;
  description: Contentful.EntryFields.Symbol;
  logo: Contentful.Asset;
  logoX2: Contentful.Asset;
  logoLight?: Contentful.Asset;
  logoLightX2?: Contentful.Asset;
}

export type TypeLogo = Contentful.Entry<TypeLogoFields>;
