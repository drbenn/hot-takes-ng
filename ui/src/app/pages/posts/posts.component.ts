import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Post } from './types/posts.types';
import { PostsApiService } from './services/posts-api.service';
import { take } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'posts',
  standalone: true,
  imports: [CommonModule, DatePipe, ButtonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  protected postsSignal: WritableSignal<Post[]> = signal([]);
  private postFetchCount: number = 0;

  constructor(
    private postsApiService: PostsApiService
  ) {}


  ngOnInit(): void {
    this.fetchMorePosts();
  };

  protected fetchMorePosts(): void {
    this.postFetchCount += 25;
    this.postsApiService.getNext20Posts(this.postFetchCount)
    .pipe(take(1)).subscribe({
      next: (posts: Post[]) => {     
        const currentPosts: Post[] = this.postsSignal();
        const updatedPosts: Post[] = [...currentPosts, ...posts ]
        this.postsSignal.set(updatedPosts)
      },
      error: (error: Error) => console.error('Error Fetching Posts: ', error)
    });
  }

}
