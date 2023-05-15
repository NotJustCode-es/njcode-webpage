import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContentfulClientApi, createClient, EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import {
  from, Observable,
} from 'rxjs';
import { ContentfulConfiguration } from '@server/core/models/contentful-configuration';
import { ContentfulContentTypes } from '@server/models/contentful-content-types.enum';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { ContentfulPageQueryParams } from '@server/models/contentful-page-query-params';
import { TypeSection__postsFields } from '@server/models/contentful-content-types/section-posts';

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

  private getFromContentful(type: ContentfulContentTypes, options?: { pageParams?: ContentfulPageQueryParams, limit?: number }):
  Observable<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>> {
    return from(this.contentfulClient.getEntries<TypePageFields>({
      content_type: type,
      locale: options?.pageParams?.locale,
      include: 10,
      'fields.slug': options?.pageParams?.slug,
      limit: options?.limit,
    }));
  }

  getPage(pageParams: ContentfulPageQueryParams): Observable<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>> {
    return this.getFromContentful(ContentfulContentTypes.Page, { pageParams });
  }

  getAllPages(limit: number): Observable<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>> {
    return this.getFromContentful(ContentfulContentTypes.Page, { limit });
  }

  getMediumPostsUser(): Observable<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypeSection__postsFields>> {
    return from(this.contentfulClient.getEntries<TypeSection__postsFields>({
      content_type: ContentfulContentTypes.sectionPost,
      limit: 1,
    }));
  }
}
