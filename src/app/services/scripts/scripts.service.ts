import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScriptsService {
  private renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platform: string,
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  get head(): HTMLElement {
    return this.document.head;
  }

  createScript(src: string): void {
    if (isPlatformBrowser(this.platform)) {
      const script = this.createScriptElement();
      this.renderer.setAttribute(script, 'src', src);
      this.renderer.appendChild(this.head, script);
    }
  }

  createScriptWithBody(body: string): void {
    if (isPlatformBrowser(this.platform)) {
      const script = this.createScriptElement();
      script.innerHTML = body;
      this.renderer.appendChild(this.head, script);
    }
  }

  removeScript(src: string): void {
    if (isPlatformBrowser(this.platform)) {
      const script = this.document.querySelector(`script[src="${src}"]`);
      if (script) {
        this.renderer.removeChild(this.head, script);
      }
    }
  }

  private createScriptElement(): HTMLScriptElement {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'async', 'true');
    this.renderer.setAttribute(script, 'defer', 'true');
    return script;
  }
}
