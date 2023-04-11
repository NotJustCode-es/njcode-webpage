import { expect, jest } from '@jest/globals';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ContentfulApiService } from '@server/contentful-api/contentful-api.service';
import { ClientConfiguration } from '@server/core/models/client-configuration';
import { configServiceStub } from '@server/shared/testing/stub/config-service.stub';
import { contentfulApiStub } from '@server/shared/testing/stub/contentful-api.stub';
import { RootController } from '@server/root/root.controller';
import { RootService } from '@server/root/root.service';

describe('ContactController', () => {
  let controller: RootController;
  let service: RootService;
  let configStub: ConfigService;

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
    controller.getEntries().subscribe();
    expect(serviceSpy).toHaveBeenCalledWith(expect.anything(), configStub.get<string>('HOSTNAME'));
  });

  it('should call robots', () => {
    const serviceSpy = jest.spyOn(service, 'getRobotsContent');
    controller.getRobots();
    expect(serviceSpy).toHaveBeenCalledWith(configStub.get<string>('HOSTNAME'));
  });

  it('should return client configuration', () => {
    expect(controller.getClientConfiguration()).toEqual(configStub.get<ClientConfiguration>('client'));
  });
});
