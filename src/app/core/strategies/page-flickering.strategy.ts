import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';

/*
 * Known issue of Angular Universal SSR, this fix is based on the following issue comment:
 * https://github.com/angular/preboot/issues/135#issuecomment-1081950340
 * Thanks @pavelrazuvalau
 */
export function pageFlickeringStrategy(platformId: string): () => void {
  return () => {
    if (isPlatformBrowser(platformId)) {
      const transitionStyles = Array.from(document.querySelectorAll('style[ng-transition]'));

      const serverRoot = document.body.querySelector('app-root') as HTMLElement;
      const clientRoot = serverRoot.cloneNode() as HTMLElement;

      serverRoot.setAttribute('ng-non-bindable', '');
      clientRoot.style.display = 'none';

      document.body.insertBefore(clientRoot, serverRoot);

      transitionStyles.forEach(element => {
        element.removeAttribute('ng-transition');
      });

      fromEvent(window, 'load').subscribe(() => {
        transitionStyles.forEach(el => el.remove());

        clientRoot.style.display = 'block';
        serverRoot.remove();
      });
    }
  };
}
