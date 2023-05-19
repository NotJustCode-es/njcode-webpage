import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { PostsApiController } from '@server/posts-api/posts-api.controller';
import { PostsApiService } from '@server/posts-api/posts-api.service';
import { of } from 'rxjs';

describe('PostApiController', () => {
  let controller: PostsApiController;
  let service: PostsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsApiController],
      providers: [PostsApiService],
      imports: [HttpModule],
    }).compile();
    service = module.get<PostsApiService>(PostsApiService);
    controller = module.get<PostsApiController>(PostsApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.getPosts', () => {
    const getPostsSpy = jest.spyOn(service, 'getPosts');
    const user = 'test';
    jest.spyOn(service, 'getPosts').mockImplementationOnce(() => of());
    controller.getPosts(user).subscribe();
    expect(getPostsSpy).toHaveBeenCalledWith(user);
  });
});
