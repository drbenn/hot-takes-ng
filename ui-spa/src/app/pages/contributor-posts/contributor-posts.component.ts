import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsApiService } from '../posts/services/posts-api.service';
import { Post } from '../posts/types/posts.types';
import { delay, finalize, take } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CommentComponent } from '../posts/components/comment/comment.component';

@Component({
  selector: 'app-contributor-posts',
  standalone: true,
  imports: [DatePipe, ButtonModule, CommentComponent],
  templateUrl: './contributor-posts.component.html',
  styleUrl: './contributor-posts.component.scss'
})
export class ContributorPostsComponent implements OnInit {
  protected isLoading: boolean = false;
  protected isErrorRetrievingPosts: boolean = false;
  protected postsSignal: WritableSignal<Post[]> = signal([]);
  private postFetchCount: number = 0;
  private contributorId!: string | null;

  constructor(
    private route: ActivatedRoute,
    private postsApiService: PostsApiService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.contributorId = params.get('id');
      if (this.contributorId) {
        this.fetchMorePostsByContributor();
      };
    });
  };

  protected fetchMorePostsByContributor(): void {
    this.isLoading = true;
    if (this.contributorId) {
      this.postsApiService.getNext25PostsForContributor(this.postFetchCount, this.contributorId)
      .pipe(take(1), delay(800), finalize(() => this.isLoading = false)).subscribe({
        next: (posts: Post[]) => {
          const currentPosts: Post[] = this.postsSignal();
          const updatedPosts: Post[] = [...currentPosts, ...posts ];
          this.postsSignal.set(updatedPosts);
        },
        error: (error: Error) => {
          this.isErrorRetrievingPosts = true;
          console.error('Error Fetching Posts: ', error);
        }
      });
      this.postFetchCount += 25;
    };
  };
}
