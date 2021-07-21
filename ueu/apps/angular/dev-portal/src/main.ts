import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { EventTracking, EventTrackingUserType } from '@picpay/event-tracking';
import { throwError } from 'rxjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => throwError(err));

EventTracking.init({
    userType: EventTrackingUserType.CONSUMER,
    production: environment.production,
});
