import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Route[] = [
  {
    path: 'contactmanager',
    // lazy load module syntax:
    loadChildren: () =>
      import('./contactmanager/contactmanager.module').then(
        (m) => m.ContactmanagerModule
      ),
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then((m) => m.DemoModule),
  },
  // a catch all route:
  { path: '**', redirectTo: 'contactmanager' },
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
