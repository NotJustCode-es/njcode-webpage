import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ScriptsService } from '@services/scripts/scripts.service';

@Injectable({
  providedIn: 'root',
})
export class PluginsService {
  readonly pluginsScriptPath = 'assets/js/plugins.js';

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private scriptService: ScriptsService,
  ) { }

  loadPlugins(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.scriptService.removeScript(this.pluginsScriptPath);
        this.scriptService.createScript(this.pluginsScriptPath);
      });
    }
  }
}
