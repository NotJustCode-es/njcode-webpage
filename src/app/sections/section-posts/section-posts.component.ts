import {
  ChangeDetectionStrategy, Component, Input, OnInit,
} from '@angular/core';
import { TypeSection__postsFields } from '@server/models/contentful-content-types/section-posts';
import { Post } from '@server/models/post';
import { PluginsService } from '@services/plugins/plugins.service';
import { PostsService } from '@services/posts/posts.service';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-section-posts',
  templateUrl: './section-posts.component.html',
  styleUrls: ['./section-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionPostsComponent implements OnInit {
  @Input() data!: TypeSection__postsFields;

  posts$!: Observable<Post[]>;

  constructor(
    private postService: PostsService,
    private pluginsService: PluginsService,
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts(this.data.user)
      .pipe(
        tap(() => this.pluginsService.loadPlugins()),
      );
  }
}
