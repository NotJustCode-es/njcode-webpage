import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ScriptService } from '@services/script/script.service';

@Injectable({
  providedIn: 'root',
})
export class PluginsService {
  readonly pluginsScriptPath = 'assets/js/plugins.js';

  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private scriptService: ScriptService,
  ) { }

  loadPlugins(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scriptService.removeScript(this.pluginsScriptPath);
      this.scriptService.createScript(this.pluginsScriptPath);
    }
  }
}
