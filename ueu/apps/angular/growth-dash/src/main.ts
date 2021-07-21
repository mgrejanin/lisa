import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableAkitaProdMode, persistState } from '@datorama/akita';
import { throwError } from 'rxjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
    enableAkitaProdMode();
}

persistState({
    include: ['auth'],
});

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => throwError(err));
