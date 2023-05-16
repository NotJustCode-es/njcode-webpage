import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { PostApiController } from '@server/post-api/post-api.controller';
import { PostApiService } from '@server/post-api/post-api.service';
import { of } from 'rxjs';

describe('PostApiController', () => {
  let controller: PostApiController;
  let service: PostApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostApiController],
      providers: [PostApiService],
      imports: [HttpModule],
    }).compile();
    service = module.get<PostApiService>(PostApiService);
    controller = module.get<PostApiController>(PostApiController);
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
