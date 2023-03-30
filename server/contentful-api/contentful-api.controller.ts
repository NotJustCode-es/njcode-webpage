import {
  Controller, Get, Inject, Query, UseInterceptors,
} from '@nestjs/common';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import { Observable } from 'rxjs';
import { ContentfulEntriesInterceptor } from '@server/interceptor/contentful-entries.interceptor';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { ContentfulPageQueryParams } from '@server/models/contentful-page-query-params';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';

@Controller('contentful-api')
@UseInterceptors(ContentfulEntriesInterceptor)
export class ContentfulApiController {
  constructor(@Inject(ContentfulApiService) private readonly contentfulApiService: ContentfulApiService) {}

  @Get('/page')
  getPage(
    @Query() params: ContentfulPageQueryParams,
  ): Observable<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>> {
    return this.contentfulApiService.getPage(params);
  }
}
