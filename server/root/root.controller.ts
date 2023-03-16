import {
  Controller, Get, Header, Inject, Req, Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';
import { ClientConfiguration } from '@server/core/models/client-configuration';
import { Request, Response } from 'express';
import {
  from, map, Observable, switchMap,
} from 'rxjs';
import { RootService } from './root.service';

@Controller()
export class RootController {
  private readonly contentfulLimitPages = 1000;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
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

  @Header('Content-Type', 'text/plain')
  @Get('/robots.txt')
  getRobots(@Res() response: Response, @Req() request: Request):void {
    response.send(
      this.rootService.getRobotsContent(request.protocol, request.get('Host')!),
    );
  }

  @Get('/configurations')
  getClientConfiguration(): ClientConfiguration {
    return this.configService.get<ClientConfiguration>('client', { infer: true });
  }
}
