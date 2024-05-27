import { HttpClient } from '@angular/common/http';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ContributorsApiService } from './services/contributors-api.service';
import { take } from 'rxjs';
import { Contributor } from './types/contributors.types';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-contributors',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './contributors.component.html',
  styleUrl: './contributors.component.scss',
  providers: [HttpClient]
})
export class ContributorsComponent implements OnInit {
  protected contributorsSignal: WritableSignal<Contributor[] | undefined> = signal(undefined);

  constructor(private contributorsApiService: ContributorsApiService) {}

  ngOnInit(): void {
    this.contributorsApiService.getAllContributors()
    .pipe(take(1)).subscribe({
      next: (contributors: Contributor[]) => this.contributorsSignal.set(contributors),
      error: (error: Error) => console.error('Error Fetching Contributors: ', error)
    });
  };
}
