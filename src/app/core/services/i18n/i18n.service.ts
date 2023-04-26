import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { RoutesEnum } from '@core/models/routes.enum';
import { environment } from '@environments/environment';
import { getBrowserLang, TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  readonly defaultRootPath = RoutesEnum.Home;

  get defaultLanguage(): string {
    return environment.i18n.defaultLang;
  }

  get availableLanguages(): string[] {
    return environment.i18n.availableLangs;
  }

  private getBrowserLanguage(): string {
    if (!isPlatformBrowser(this.platformId)) {
      return this.defaultLanguage;
    }
    const browserLang = getBrowserLang();
    return (browserLang === 'en' || browserLang === 'es') ? browserLang : this.defaultLanguage;
  }

  get languageByUrlPath(): string {
    const urlPathLanguage = this.document.location.pathname?.split('/')[1];
    return this.availableLanguagesIncludes(urlPathLanguage) ? urlPathLanguage : this.getBrowserLanguage();
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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private translocoService: TranslocoService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

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
    const futureActiveLanguage = language && this.availableLanguagesIncludes(language) ? language : this.languageByUrlPath;
    this.translocoService.setActiveLang(futureActiveLanguage);
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
