import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Post } from './types/posts.types';
import { PostsApiService } from './services/posts-api.service';
import { delay, finalize, take } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CommentComponent } from "./components/comment/comment.component";
import { Router } from '@angular/router';

@Component({
    selector: 'posts',
    standalone: true,
    templateUrl: './posts.component.html',
    styleUrl: './posts.component.scss',
    imports: [CommonModule, DatePipe, ButtonModule, CommentComponent]
})
export class PostsComponent implements OnInit {
  protected isLoading: boolean = false;
  protected isErrorRetrievingPosts: boolean = false;
  protected postsSignal: WritableSignal<Post[]> = signal([]);
  private postFetchCount: number = 0;

  constructor(
    private postsApiService: PostsApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMorePosts();
  };

  protected fetchMorePosts(): void {
    this.isLoading = true;
    this.postsApiService.getNext25Posts(this.postFetchCount)
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

  protected navigateToContributorPosts(contributorId: number) {
    this.router.navigateByUrl(`/contributor-posts/${contributorId}`);
  }

}
