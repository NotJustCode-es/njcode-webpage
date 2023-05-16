import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { PostsApiService } from '@server/posts-api/posts-api.service';

describe('PostsApiService', () => {
  let service: PostsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsApiService,
      ],
      imports: [
        HttpModule,
      ],
    }).compile();
    service = module.get<PostsApiService>(PostsApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
