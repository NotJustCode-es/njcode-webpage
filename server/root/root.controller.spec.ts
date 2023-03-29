import { expect, jest } from '@jest/globals';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';
import { ClientConfiguration } from '@server/core/models/client-configuration';
import { configServiceStub } from '@server/shared/testing/stub/config-service.stub';
import { contentfulApiStub } from '@server/shared/testing/stub/contentful-api.stub';
import { Request } from 'express';
import { RootController } from './root.controller';
import { RootService } from './root.service';

describe('ContactController', () => {
  let controller: RootController;
  let service: RootService;
  let configStub: ConfigService;

  const requestMock = {
    protocol: 'https',
    get(header: string): string {
      switch (header) {
        case 'x-forwarded-proto':
          return 'https';
        case 'x-forwarded-host':
        default:
          return 'localhost:4200';
      }
    },
  } as unknown as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RootController],
      providers: [
        RootService,
        {
          provide: ConfigService,
          useClass: configServiceStub,
        },
        {
          provide: ContentfulApiService,
          useClass: contentfulApiStub,
        },
      ],

    }).compile();

    controller = module.get<RootController>(RootController);
    service = module.get<RootService>(RootService);
    configStub = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call sitemap', () => {
    const serviceSpy = jest.spyOn(service, 'getSitemap');
    controller.getEntries(requestMock).subscribe();
    expect(serviceSpy).toHaveBeenCalledWith(expect.anything(), `${requestMock.get('x-forwarded-proto')}://${requestMock.get('x-forwarded-host')}`);
  });

  it('should call robots', () => {
    const serviceSpy = jest.spyOn(service, 'getRobotsContent');
    controller.getRobots(requestMock);
    expect(serviceSpy).toHaveBeenCalledWith(requestMock.get('x-forwarded-proto'), requestMock.get('x-forwarded-host'));
  });

  it('should return client configuration', () => {
    expect(controller.getClientConfiguration()).toEqual(configStub.get<ClientConfiguration>('client'));
  });
});
