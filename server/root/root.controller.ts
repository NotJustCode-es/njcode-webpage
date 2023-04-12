import {
  Controller, Get, Header, Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';
import { ClientConfiguration } from '@server/core/models/client-configuration';
import {
  from, map, Observable, switchMap,
} from 'rxjs';
import { RootService } from '@server/root/root.service';

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
  getEntries(): Observable<string> {
    return this.contentfulApiService.getAllPages(this.contentfulLimitPages)
      .pipe(
        switchMap(entries => from(this.rootService.getSitemap(entries, this.configService.get<string>('hostname')))),
        map(xml => xml.toString()),
      );
  }

  @Header('Content-Type', 'text/plain')
  @Get('/robots.txt')
  getRobots(): string {
    return this.rootService.getRobotsContent();
  }

  @Get('/configurations')
  getClientConfiguration(): ClientConfiguration {
    return this.configService.get<ClientConfiguration>('client', { infer: true });
  }
}
