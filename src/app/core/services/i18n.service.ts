import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { environment } from '@environments/environment';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly defaultRootPath = '/';

  get defaultLanguage(): string {
    return environment.i18n.defaultLang;
  }

  get availableLanguages(): string[] {
    return environment.i18n.availableLangs;
  }

  get languageByUrlPath(): string {
    const urlPathLanguage = this.document.location.pathname?.split('/')[1];
    return this.availableLanguagesIncludes(urlPathLanguage) ? urlPathLanguage : this.defaultLanguage;
  }

  get urlWithoutLanguage(): string {
    const path = this.document.location.pathname;
    const language = path?.split('/').find(segment => this.availableLanguagesIncludes(segment));
    const url = language ? path.substring(path.indexOf(language) + language.length) : path;
    return url || this.defaultRootPath;
  }

  get activeLanguage(): string {
    return this.translocoService.getActiveLang();
  }

  get languageChanges$(): Observable<string> {
    return this.translocoService.langChanges$;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private translocoService: TranslocoService,
  ) { }

  static factory(
    i18nService: I18nService,
  ): () => Promise<void> {
    return () => Promise.resolve(i18nService.init());
  }

  init(): void {
    this.setLanguageSubscriptions();
    this.setActiveLanguage();
  }

  setActiveLanguage(language?: string): void {
    this.translocoService.setActiveLang(language || this.languageByUrlPath);
  }

  setLanguageSubscriptions(): void {
    this.translocoService.langChanges$.subscribe((language: string) => this.setLanguageRouteAndNavigate(language));
    this.router.events.subscribe(event => this.handleRouterEvent(event));
  }

  private setLanguageRouteAndNavigate(language: string): void {
    this.router.navigateByUrl(`/${language}${this.urlWithoutLanguage}`);
  }

  private availableLanguagesIncludes(lang: string): boolean {
    return this.availableLanguages.indexOf(lang) !== -1;
  }

  private handleRouterEvent(event: unknown): void {
    if (event instanceof NavigationStart || event instanceof RoutesRecognized) {
      const urlPathLanguage = event.url.split('/')[1];
      if (!this.availableLanguagesIncludes(urlPathLanguage)) {
        const url = event.url !== this.defaultRootPath ? event.url : '';
        this.router.navigateByUrl(`/${this.activeLanguage}${url}`);
      }
    }
  }
}
