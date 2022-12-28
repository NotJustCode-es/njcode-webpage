import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContentfulClientApi, createClient, EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import { from, Observable } from 'rxjs';
import { ContentfulConfiguration } from '../core/models/contentful-configuration';
import { ContentfulContentTypes } from '../models/contentful-content-types.enum';
import { TypePageFields } from '../models/contentful-content-types/page';
import { ContentfulPageParams } from '../models/contentful-page-params';

@Injectable()
export class ContentfulApiService {
  private contentfulClient!: ContentfulClientApi;

  private get contentfulConfiguration(): ContentfulConfiguration {
    return this.configService.get<ContentfulConfiguration>('contentful', { infer: true });
  }

  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
    this.contentfulClient = createClient({
      space: this.contentfulConfiguration.spaceId,
      accessToken: this.contentfulConfiguration.accessToken,
      environment: this.contentfulConfiguration.environment,
      resolveLinks: true,
    });
  }

  getPage(pageParams: ContentfulPageParams): Observable<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>> {
    return from(this.contentfulClient.getEntries<TypePageFields>({
      content_type: ContentfulContentTypes.Page,
      'fields.slug': pageParams.slug,
    }));
  }
}
