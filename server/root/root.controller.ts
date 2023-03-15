import {
  Controller, Get, Header, Inject, Req, Res,
} from '@nestjs/common';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';
import {
  from, map, Observable, switchMap,
} from 'rxjs';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ClientConfiguration } from '@server/models/client-configuration';
import { RootService } from './root.service';

@Controller()
export class RootController {
  private readonly contentfulLimitPages = 1000;

  constructor(
    @Inject(RootService) private readonly rootService: RootService,
    @Inject(ContentfulApiService) private readonly contentfulApiService: ContentfulApiService,
    @Inject(ConfigService) private readonly configService: ConfigService,
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
  getEnv(@Res() res: Response): void {
    const clientConfiguration = {
      default_lang: this.configService.get('DEFAULT_LANG'),
      available_lang: this.configService.get('AVAILABLE_LANG').split(' '),
      asset_url: this.configService.get('ASSET_URL'),
      google_analytics_id: this.configService.get('GOOGLE_ANALYTICS_ID'),
      google_recaptcha_site_key: this.configService.get('GOOGLE_RECAPTCHA_SITE_KEY'),
    } as ClientConfiguration;
    res.send(clientConfiguration);
  }
}
