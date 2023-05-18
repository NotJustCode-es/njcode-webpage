import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { Post } from '@server/models/post';
import { PostsApiService } from '@server/posts-api/posts-api.service';
import { postApiStub } from '@server/shared/testing/stub/post-api.stub';

describe('PostsApiService', () => {
  let service: PostsApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsApiService,
        {
          provide: HttpService,
          useClass: postApiStub,
        },
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

  describe('#getPosts', () => {
    it('should return proper post[]', async () => {
      const user = 'test';

      interface testObject {
        title: string[];
        link: string[];
        pubDate: string[];
        thumbnail: string[];
        categories: string[];
      }

      const PostsJson: testObject[] = [
        {
          title: ['test'],
          link: ['test'],
          pubDate: ['1995-12-17T02:24:00.000Z'],
          thumbnail: ['https://cdn-images-1.medium.com/max/1024/1*JscDkmNIPwBxvvbU_K_uxA.png'],
          categories: ['test'],
        },
      ];
      service.getPosts(user).subscribe(posts => {
        expect(posts).toEqual(PostsJson as unknown as Post[]);
      });
    });
  });
});
