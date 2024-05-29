import { Injectable } from '@angular/core';
import { Post } from '../types/posts.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsApiService {
  private apiUrl: string = environment.apiUrl;
  // private apiUrl: string = 'http://localhost:3000/hot-takes-api-v1/posts';

  constructor(private httpClient: HttpClient) {}

  public getNext20Posts(postFetchCount: number): Observable<Post[]> {
    return this.httpClient.get(`${this.apiUrl}/posts/${postFetchCount}`) as Observable<Post[]>;
  };


}
