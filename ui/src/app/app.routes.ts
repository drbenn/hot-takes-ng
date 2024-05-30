import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts',
  },
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   loadComponent: () => 
  //     import('./pages/posts/posts.component')
  //       .then(m => m.PostsComponent)
  // },
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
  }
];
