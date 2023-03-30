import { TypePageFields } from '@server/models/contentful-content-types/page';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';

export function createTestEntryCollection(): EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields> {
  return {
    total: 1,
    skip: 0,
    limit: 1000,
    items: [
      {
        metadata: { tags: [] },
        sys: {
          space: {
            sys: {
              id: '1',
              linkType: 'Space',
              type: 'Link',
            },
          },
          environment: {
            sys: {
              id: 'master',
              linkType: 'Environment',
              type: 'Link',
            },
          },
          contentType: {
            sys: {
              id: 'test-root',
              type: 'Link',
              linkType: 'ContentType',
            },
          },
          id: '6hMfxmkHqxCqVFWL2ojOAv',
          type: 'Entry',
          createdAt: '2022-12-26T09:32:49.146Z',
          updatedAt: '2023-03-03T11:47:44.856Z',
          revision: 34,
          locale: 'en',
        },
        fields: {
          name: 'test-root',
          slug: '/',
          sections: [
          ],
        },
      },
    ],
  };
}
