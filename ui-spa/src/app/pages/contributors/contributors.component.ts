import { HttpClient } from '@angular/common/http';
import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ContributorsApiService } from './services/contributors-api.service';
import { delay, finalize, take } from 'rxjs';
import { Contributor } from './types/contributors.types';
import { JsonPipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contributors',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './contributors.component.html',
  styleUrl: './contributors.component.scss'
})
export class ContributorsComponent implements OnInit {
  protected isLoading: boolean = false;
  protected contributorsSignal: WritableSignal<Contributor[] | undefined> = signal(undefined);
  protected sanitizedBiographies: SafeHtml[] = [];

  constructor(
    private contributorsApiService: ContributorsApiService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.contributorsApiService.getAllContributors()
    .pipe(take(1), delay(500), finalize(() => this.isLoading = false)).subscribe({
      next: (contributors: Contributor[]) => {
        const biographylessContributors: Contributor[] = [];
        contributors.forEach((contributor: Contributor) => {
          // remove unnecessary biography text from object, as the string contains html tags <p>
          const { biography, ...biographylessContributor } = contributor; 
          biographylessContributors.push(biographylessContributor);
          
          // take biography text and conver to html
          if (contributor.biography) {
            const sanitizedBio: SafeHtml = this.sanitizeHtml(contributor.biography);
            this.sanitizedBiographies?.push(sanitizedBio);
          }
        });
        this.contributorsSignal.set(biographylessContributors)
      },
      error: (error: Error) => console.error('Error Fetching Contributors: ', error)
    });
  };

  protected sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  };

  protected navigateToContributorPosts(contributorId: number) {
    this.router.navigateByUrl(`/contributor-posts/${contributorId}`);
  };
}
