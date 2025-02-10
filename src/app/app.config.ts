import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),

    // Le module HttpClientInMemoryWebApiModule intercepte les requêtes HTTP
    // et renvoie les réponses du serveur simulées.
    // Supprimez-le lorsqu'un vrai serveur est prêt à recevoir des requêtes
    importProvidersFrom(HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService))
  ]
};
