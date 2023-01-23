import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';

import { ScriptService } from './script.service';

describe('ScriptService', () => {
  let service: ScriptService;
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
    service = TestBed.inject(ScriptService);
    document = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#createScript', () => {
    it('should add script with src', () => {
      const src = 'src';
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
});
