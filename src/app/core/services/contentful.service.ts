import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private readonly getPagePath = '/api/contentful-api/page/';

  private get baseUrl(): string {
    return environment.baseUrl;
  }

  constructor(private httpClient: HttpClient) { }

  getPage(url: string): Observable<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>> {
    const params = new HttpParams().set('slug', url);
    return this.httpClient.get<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>>(`${this.baseUrl}${this.getPagePath}`, { params });
  }
}
