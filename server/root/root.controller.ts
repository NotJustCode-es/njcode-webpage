import {
  Controller, Get, Header, Inject, Req,
} from '@nestjs/common';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';
import {
  from, map, Observable, switchMap,
} from 'rxjs';
import { Request } from 'express';
import { ClientConfiguration } from '@server/core/models/client-configuration';
import { RootService } from './root.service';

@Controller()
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

  @Get('/configurations')
  getClientConfiguration(): ClientConfiguration {
    return this.rootService.getClientConfiguration();
  }
}
