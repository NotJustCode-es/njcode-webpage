import { Test, TestingModule } from '@nestjs/testing';
import { PostApiService } from '@server/post-api/post-api.service';
import { PostApiController } from './post-api.controller';

describe('PostApiController', () => {
  let controller: PostApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostApiController],
      providers: [PostApiService],
    }).compile();

    controller = module.get<PostApiController>(PostApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
