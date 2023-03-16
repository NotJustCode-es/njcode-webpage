import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationStart, Router, RoutesRecognized } from '@angular/router';
import { RoutesEnum } from '@core/models/routes.enum';
import { ConfigurationService } from '@core/services/configuration/configuration.service';
import { TranslocoService } from '@ngneat/transloco';
import {
  firstValueFrom, map, Observable, take,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  readonly defaultRootPath = RoutesEnum.Home;

  get defaultLanguage(): string {
    return this.configurationService.configurationData.i18n.defaultLang;
  }

  get availableLanguages(): string[] {
    return this.configurationService.configurationData.i18n.availableLangs;
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

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private translocoService: TranslocoService,
    private configurationService: ConfigurationService,
  ) {}

  static factory(
    i18nService: I18nService,
  ): () => Promise<void> {
    return () => firstValueFrom(i18nService.init());
  }

  init(): Observable<void> {
    return this.configurationService.configurationData$
      .pipe(
        take(1),
        map(() => {
          this.setLanguageSubscriptions();
          this.setActiveLanguage();
        }),
      );
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
