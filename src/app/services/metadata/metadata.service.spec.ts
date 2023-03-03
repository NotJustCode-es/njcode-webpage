import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { TypeMetadataFields } from '@server/models/contentful-content-types/metadata';
import { MetadataService } from './metadata.service';

describe('MetadataService', () => {
  let service: MetadataService;
  let document: Document;
  const myMetadata: TypeMetadataFields = {
    name: 'metaName',
    title: 'metaTitle',
    description: 'metaServiceDesc',
    keywords: ['code', 'clean'],
    index: false,
    follow: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadataService);
    document = TestBed.inject(DOCUMENT);
    service.setMetadata(myMetadata);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should create meta tags', () => {
    it('should create name metadata tag', () => {
      expect(document.querySelector("meta[name='name']")).toBeTruthy();
    });
    it('should create title metadata tag', () => {
      expect(document.title).toBeTruthy();
    });
    it('should create description metadata tag', () => {
      expect(document.querySelector("meta[name='description']")).toBeTruthy();
    });
    it('should create keywords metadata tag', () => {
      expect(document.querySelector("meta[name='keywords']")).toBeTruthy();
    });
    it('should create robots metadata tag', () => {
      expect(document.querySelector("meta[name='robots']")).toBeTruthy();
    });
  });

  describe('should assign given values to meta tags', () => {
    it('should set name metadata tag', () => {
      expect(document.querySelector("meta[name='name']")?.getAttribute('content')).toEqual(myMetadata.name);
    });

    it('should set title metadata tag', () => {
      expect(document.title).toEqual(myMetadata.title);
    });

    it('should set description metadata tag', () => {
      expect(document.querySelector("meta[name='description']")?.getAttribute('content')).toEqual(myMetadata.description);
    });

    it('should set keywords metadata tag', () => {
      expect(document.querySelector("meta[name='keywords']")?.getAttribute('content')).toEqual('code, clean');
    });

    it('should set robots metadata tag to noindex, nofollow when robots are false', () => {
      myMetadata.follow = false;
      myMetadata.index = false;
      service.setMetadata(myMetadata);
      expect(document.querySelector("meta[name='robots']")?.getAttribute('content')).toEqual('noindex, nofollow');
    });

    it('should set robots metadata tag to index, follow when robots are true', () => {
      myMetadata.follow = true;
      myMetadata.index = true;
      service.setMetadata(myMetadata);
      expect(document.querySelector("meta[name='robots']")?.getAttribute('content')).toEqual('index, follow');
    });
  });
});
