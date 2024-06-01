import { Injectable } from '@angular/core';
import { Comment, Post } from '../types/posts.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public getNext25Posts(postFetchCount: number): Observable<Post[]> {
    return this.httpClient.get(`${this.apiUrl}/posts/${postFetchCount}`) as Observable<Post[]>;
  };

  public submitComment(body: Comment): Observable<Comment> {
    return this.httpClient.post<any>(`${this.apiUrl}/posts/comment`, body) as Observable<Comment>;
  };


}
