import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ScriptsService } from '@services/scripts/scripts.service';

describe('ScriptsService', () => {
  let service: ScriptsService;
  let document: Document;

  function findScriptElementByAttribute(value: string, attribute = 'src'): HTMLScriptElement | undefined {
    const scripts = Array.from(document.getElementsByTagName('script'));
    return scripts?.find((script: Element) => {
      const attributeValue = attribute !== 'innerHTML' ? script.getAttribute(attribute) : script.innerHTML;
      return attributeValue?.includes(value);
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScriptsService);
    document = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#createScript', () => {
    it('should add script with src', () => {
      const src = 'createSrc';
      service.createScript(src);
      expect(findScriptElementByAttribute(src)).toBeTruthy();
    });
  });

  describe('#createScriptWithBody', () => {
    it('should add script with body', () => {
      const body = 'console.log("#createScriptWithBody test")';
      service.createScriptWithBody(body);
      expect(findScriptElementByAttribute(body, 'innerHTML')).toBeTruthy();
    });
  });

  describe('#removeScript', () => {
    it('should remove script with src', () => {
      const src = 'removeSrc';
      service.createScript(src);
      service.removeScript(src);
      expect(findScriptElementByAttribute(src)).toBeFalsy();
    });
  });
});
