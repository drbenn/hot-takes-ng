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
    path: 'contributors',
    pathMatch: 'full',
    loadComponent: () => 
      import('./pages/contributors/contributors.component')
        .then(m => m.ContributorsComponent)
  },
  {
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => 
      import('./pages/login/login.component')
        .then(m => m.ContributorsComponent)
  }
];
