import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { contentfulApiStub } from '@server/shared/testing/stub/contentful-api.stub';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';
import { configServiceStub } from '@server/shared/testing/stub/config-service.stub';
import { Request, Response } from 'express';
import { expect, jest } from '@jest/globals';
import { ClientConfiguration } from '@server/core/models/client-configuration';
import { RootService } from './root.service';
import { RootController } from './root.controller';

describe('ContactController', () => {
  let controller: RootController;
  let service: RootService;
  let configStub: ConfigService;

  const requestMock = {
    protocol: 'https',
    get(): string {
      return 'localhost:4200';
    },
  } as unknown as Request;

  const responseMock = {
    send: jest.fn(data => data),
  } as unknown as Response;

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
    expect(serviceSpy).toHaveBeenCalledWith(expect.anything(), `${requestMock.protocol}://${requestMock.get('')}`);
  });

  it('should call robots', () => {
    const serviceSpy = jest.spyOn(service, 'getRobotsContent');
    controller.getRobots(responseMock, requestMock);
    expect(serviceSpy).toHaveBeenCalledWith(requestMock.protocol, requestMock.get(''));
  });

  it('should return client configuration', () => {
    expect(controller.getClientConfiguration()).toEqual(configStub.get<ClientConfiguration>('client'));
  });
});
