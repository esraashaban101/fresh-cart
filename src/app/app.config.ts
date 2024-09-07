import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptor/header.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(),withHashLocation()),
    provideClientHydration(),
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,loadingInterceptor])),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule,TranslateModule.forRoot({
      defaultLanguage:"en",
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient],
      }
    }))
  ],

};
