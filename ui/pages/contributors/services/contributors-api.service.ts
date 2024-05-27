import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contributor } from '../types/contributors.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContributorsApiService {
  // private apiUrl: string = environment.apiUrl;
  private apiUrl: string = 'http://localhost:3000/hot-takes-api-v1/contributors';

  constructor(private httpClient: HttpClient) {}

  public getAllContributors(): Observable<Contributor[]> {
    return this.httpClient.get(this.apiUrl) as Observable<Contributor[]>;
  };

}
