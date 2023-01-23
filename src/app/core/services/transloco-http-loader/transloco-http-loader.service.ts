import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslocoHttpLoaderService implements TranslocoLoader {
  private readonly getTranslationPath = '/assets/i18n/';

  constructor(private httpClient: HttpClient) {}

  getTranslation(lang: string): Observable<Translation> {
    return this.httpClient.get<Translation>(`${this.getTranslationPath}${lang}.json`);
  }
}
