import { TypePageFields } from '@server/models/contentful-content-types/page';
import { createTestEntryCollection } from '@server/shared/testing/utils/contentful-entry-collection.util';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import { Observable, of } from 'rxjs';

export class contentfulApiStub {
  getAllPages(): Observable<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>> {
    return of(createTestEntryCollection());
  }

  getPage(): Observable<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>> {
    return of(createTestEntryCollection());
  }
}
