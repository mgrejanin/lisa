import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// akita
import { enableAkitaProdMode, persistState } from '@datorama/akita';
import { throwError } from 'rxjs';

if (environment.production) {
    enableProdMode();
    enableAkitaProdMode();
}

// Method to persist state of some
// akita stores. Add other you see fit.

persistState({
    include: ['auth'],
});

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => throwError(err));
