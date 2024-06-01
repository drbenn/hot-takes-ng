import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideAuth0({
      domain: 'dev-z4yw1wktm2qy2j0f.us.auth0.com',
      clientId: '7IamzF3s4Iq3LxtYhyRj9Cx1GdKLF4wP',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
};
