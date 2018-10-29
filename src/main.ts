import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
} else {
  console.log('%cPlease use "initializeApp()" to initialize the app without running in Tableau.', 'color: red; font-weight: bold;init');
  window['initializeApp'] = () => window['_wdc']['init'](() => {
  });
}

// noinspection TsLint
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
