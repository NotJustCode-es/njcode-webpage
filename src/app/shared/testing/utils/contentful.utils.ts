import { Entry } from 'contentful';

export function createTestEntry<T>(fields: T): Entry<T> {
  return {
    sys: {
      id: '1',
      type: 'Entry',
      createdAt: '2021-03-01T12:00:00.000Z',
      updatedAt: '2021-03-01T12:00:00.000Z',
      revision: 0,
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
          id: 'test-section',
          type: 'Link',
          linkType: 'ContentType',
        },
      },
    },
    metadata: {
      tags: [],
    },
    fields,
  };
}
