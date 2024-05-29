import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts'
  },
  {
    path: 'posts',
    loadComponent: () => 
      import('./pages/posts/posts.component')
        .then(m => m.PostsComponent)
  },
  {
    path: 'contributors',
    loadComponent: () => 
      import('./pages/contributors/contributors.component')
        .then(m => m.ContributorsComponent)
  }
];
