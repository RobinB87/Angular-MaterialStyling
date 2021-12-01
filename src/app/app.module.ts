import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Route[] = [
  {
    path: 'demo',
    // lazy load module syntax:
    loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
  },
  // catch all route:
  { path: '**', redirectTo: 'demo' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
