import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { resolve } from 'path';

export const BROWSER_APP_LOCATION = 'BROWSER_APP_LOCATION';

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  private readonly allowedExt = [
    'assets',
  ];

  private get apiPrefix(): string {
    return this.configService.get<string>('prefix') || '/api';
  }

  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(BROWSER_APP_LOCATION) private browserAppLocation: string,
  ) {}

  async use(req: Request, res: Response, next: () => void): Promise<void> {
    const { url } = req;
    if (url.indexOf(this.apiPrefix.replace(/^\/|\/$/g, '')) === 1) {
      next();
    } else if (this.allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
      res.sendFile(this.resolvePath(this.browserAppLocation, url));
    } else {
      res.sendFile(this.resolvePath(this.browserAppLocation, 'index.html'));
    }
  }

  private resolvePath(browserAppLocation: string, file: string): string {
    return resolve(`${browserAppLocation}/${file}`);
  }
}
