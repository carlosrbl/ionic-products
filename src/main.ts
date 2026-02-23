import { provideZonelessChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withPreloading } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { baseUrlInterceptor } from "./app/interceptors/base-url.interceptor";
import { authInterceptor } from "./app/interceptors/auth.interceptor";
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(withInterceptors([baseUrlInterceptor, authInterceptor])),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
