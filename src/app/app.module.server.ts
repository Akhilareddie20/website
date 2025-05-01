
import { provideServerRendering } from '@angular/platform-server';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export default function () {
  return bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideRouter(appRoutes),
      provideServerRendering()
    ]
  });
}
