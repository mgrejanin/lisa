import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// eventTracking
import { EventTracking, EventTrackingUserType } from '@picpay/event-tracking';

// akita
import { enableAkitaProdMode, persistState } from '@datorama/akita';
import { throwError } from 'rxjs';

if (environment.production) {
    enableProdMode();
    enableAkitaProdMode();
}

// Method to persist state of some
// akita stores. Add others as you see fit.
persistState({});

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => throwError(err));

EventTracking.init({
    production: environment.production,
    userType: EventTrackingUserType.CONSUMER,
});
