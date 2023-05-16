import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Posts } from '@server/models/posts';
import { PostsService } from '@services/posts/posts.service';

describe('PostApiService', () => {
  let service: PostsService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getPosts', () => {
    it('should return empty object if no posts', () => {
      const user = 'test';
      const response = {};
      service.getPosts(user).subscribe(posts => {
        expect(posts).toEqual({} as Posts);
      });
      controller.expectOne(`${service.getPostsPath}?user=${user}`).flush(response);
    });
  });
});
