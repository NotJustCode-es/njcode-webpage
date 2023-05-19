import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionPostsComponent } from '@sections/section-posts/section-posts.component';
import { PostsService } from '@services/posts/posts.service';

describe('SectionPostsComponent', () => {
  let component: SectionPostsComponent;
  let fixture: ComponentFixture<SectionPostsComponent>;
  let postService: PostsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionPostsComponent],
      imports: [HttpClientTestingModule],

    })
      .compileComponents();
    fixture = TestBed.createComponent(SectionPostsComponent);
    postService = TestBed.inject(PostsService);
    component = fixture.componentInstance;
    component.data = {
      user: 'test',
      title: 'test',
      subTitle: 'test',
      imageHover: 'test',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call postService.getPosts', () => {
      const getPostsSpy = spyOn(postService, 'getPosts');
      component.ngOnInit();
      expect(getPostsSpy).toHaveBeenCalled();
    });
  });
});
