import {
  Controller, Get, Header, Inject, UseInterceptors, Req,
} from '@nestjs/common';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';
import {
  from, map, Observable, switchMap,
} from 'rxjs';
import { Request } from 'express';
import { ContentfulEntriesInterceptor } from '../interceptor/contentful-entries.interceptor';
import { RootService } from './root.service';

@Controller()
@UseInterceptors(ContentfulEntriesInterceptor)
export class RootController {
  private readonly contentfulLimitPages = 1000;

  constructor(
    @Inject(RootService) private readonly rootService: RootService,
    @Inject(ContentfulApiService) private readonly contentfulApiService: ContentfulApiService,
  ) {}

  @Header('Content-Type', 'application/xml')
  @Get('/sitemap.xml')
  getEntries(@Req() request: Request): Observable<string> {
    const hostUrl = `${request.protocol}://${request.get('Host')}`;
    return this.contentfulApiService.getAllPages(this.contentfulLimitPages)
      .pipe(
        switchMap(entries => from(this.rootService.getSitemap(entries, hostUrl))),
        map(xml => xml.toString()),
      );
  }
}