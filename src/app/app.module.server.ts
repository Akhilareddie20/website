// import { NgModule } from '@angular/core';
// import { ServerModule } from '@angular/platform-server';
// import { provideServerRouting } from '@angular/ssr';
// import { AppComponent } from './app.component';
// import { serverRoutes } from './app.routes.server';

// @NgModule({
//   imports: [AppModule, ServerModule],
//   providers: [provideServerRouting(serverRoutes)],
//   bootstrap: [AppComponent],
// })
// export class AppServerModule {}

// src/app/app.module.server.ts
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
