import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContentfulClientApi, createClient, EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import { from, Observable } from 'rxjs';
import { ContentfulConfiguration } from '../core/models/contentful-configuration';
import { ContentfulContentTypes } from '../models/contentful-content-types.enum';
import { TypePageFields } from '../models/contentful-content-types/page';
import { ContentfulPageQueryParams } from '../models/contentful-page-query-params';

@Injectable()
export class ContentfulApiService {
  private contentfulClient!: ContentfulClientApi;

  private get contentfulConfiguration(): ContentfulConfiguration {
    return this.configService.get<ContentfulConfiguration>('contentful', { infer: true });
  }

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.contentfulClient = createClient({
      space: this.contentfulConfiguration.spaceId,
      accessToken: this.contentfulConfiguration.accessToken,
      environment: this.contentfulConfiguration.environment,
      resolveLinks: true,
    });
  }

  getPage(pageParams: ContentfulPageQueryParams): Observable<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>> {
    return from(this.contentfulClient.getEntries<TypePageFields>({
      content_type: ContentfulContentTypes.Page,
      locale: pageParams.locale,
      'fields.slug': pageParams.slug,
    }));
  }

  getAllPages(limit: number): Observable<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>> {
    return from(this.contentfulClient.getEntries<TypePageFields>({
      content_type: ContentfulContentTypes.Page,
      limit,
    }));
  }
}
