import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { MetadaService } from './metada.service';

describe('MetadaService', () => {
  let service: MetadaService;
  let document: Document;
  const myMetaData:Record<string, unknown> = {
    name: 'metaName',
    title: 'metaTitle',
    description: 'metaServiceDesc',
    keywords: ['code', 'clean'],
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8',
    index: false,
    follow: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadaService);
    document = TestBed.inject(DOCUMENT);
    service.setMetadata(myMetaData);
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
    it('should create viewport metadata tag', () => {
      expect(document.querySelector("meta[name='viewport']")).toBeTruthy();
    });
    it('should create charset metadata tag', () => {
      expect(document.querySelector("meta[name='charset']")).toBeTruthy();
    });
    it('should create robots metadata tag', () => {
      expect(document.querySelector("meta[name='robots']")).toBeTruthy();
    });
  });
  describe('should assign given values to meta tags', () => {
    it('should set name metadata tag', () => {
      expect(document.querySelector("meta[name='name']")?.getAttribute('content')).toEqual(myMetaData['name'] as string);
    });

    it('should set title metadata tag', () => {
      expect(document.title).toEqual(myMetaData['title'] as string);
    });

    it('should set description metadata tag', () => {
      expect(document.querySelector("meta[name='description']")?.getAttribute('content')).toEqual(myMetaData['description'] as string);
    });

    it('should set keywords metadata tag', () => {
      expect(document.querySelector("meta[name='keywords']")?.getAttribute('content')).toEqual('code,clean');
    });

    it('should set viewport metadata tag', () => {
      expect(document.querySelector("meta[name='viewport']")?.getAttribute('content')).toEqual(myMetaData['viewport'] as string);
    });

    it('should set robots metadata tag', () => {
      expect(document.querySelector("meta[name='robots']")?.getAttribute('content')).toEqual('noindex, nofollow');
    });

    it('should set charset metadata tag', () => {
      expect(document.querySelector("meta[name='charset']")?.getAttribute('content')).toEqual(myMetaData['charset'] as string);
    });
  });
});
