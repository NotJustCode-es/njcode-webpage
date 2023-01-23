import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private readonly getPagePath = '/api/contentful-api/page/';

  constructor(private httpClient: HttpClient) { }

  getPage(url: string, locale: string): Observable<TypePageFields> {
    const params = new HttpParams()
      .set('slug', url)
      .set('locale', locale);
    return this.httpClient.get<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>>(
      this.getPagePath,
      { params },
    )
      .pipe(
        map(response => response.items[0]?.fields || {}),
      );
  }
}
