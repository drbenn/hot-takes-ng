import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contributor } from '../types/contributors.types';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContributorsApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public getAllContributors(): Observable<Contributor[]> {
    return this.httpClient.get(`${this.apiUrl}/contributors`) as Observable<Contributor[]>;
  };

}
