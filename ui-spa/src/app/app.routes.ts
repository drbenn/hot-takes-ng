import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts',
  },
  {
    path: 'posts',
    pathMatch: 'full',
    loadComponent: () => 
      import('./pages/posts/posts.component')
        .then(m => m.PostsComponent)
  },
  {
    path: 'contributor-posts/:id',
    pathMatch: 'full',
    loadComponent: () => 
      import('./pages/contributor-posts/contributor-posts.component')
        .then(m => m.ContributorPostsComponent)
  },
  {
    path: 'contributors',
    pathMatch: 'full',
    loadComponent: () => 
      import('./pages/contributors/contributors.component')
        .then(m => m.ContributorsComponent)
  },
  {
    // Wildcard path
    path: '**',
    loadComponent: () => 
      import('./pages/posts/posts.component')
        .then(m => m.PostsComponent)
  },
]
