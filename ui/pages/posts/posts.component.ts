import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { Post } from './types/posts.types';
import { PostsApiService } from './services/posts-api.service';
import { take } from 'rxjs';

@Component({
  selector: 'posts',
  standalone: true,
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  protected postsSignal: WritableSignal<Post[] | undefined> = signal(undefined);

  constructor(
    private postsApiService: PostsApiService
  ) {}


  ngOnInit(): void {
    this.postsApiService.getAllPosts()
    .pipe(take(1)).subscribe({
      next: (posts: Post[]) => {
        console.log(posts);
        
        this.postsSignal.set(posts)
      },
      error: (error: Error) => console.error('Error Fetching Posts: ', error)
    });

  }
}
