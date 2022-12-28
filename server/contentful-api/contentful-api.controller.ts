import {
  Controller, Get, Inject, Query, UseInterceptors,
} from '@nestjs/common';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import { Observable } from 'rxjs';
import { ContentfulEntriesInterceptor } from '../interceptor/contentful-entries.interceptor';
import { TypePageFields } from '../models/contentful-content-types/page';
import { ContentfulPageParams } from '../models/contentful-page-params';
import { ContentfulApiService } from './contentful-api.service';

@Controller('contentful-api')
@UseInterceptors(ContentfulEntriesInterceptor)
export class ContentfulApiController {
  constructor(@Inject(ContentfulApiService) private readonly contentfulApiService: ContentfulApiService) {}

  @Get('/page')
  getPage(
    @Query() params: ContentfulPageParams,
  ): Observable<EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>> {
    return this.contentfulApiService.getPage(params);
  }
}
