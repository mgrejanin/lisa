import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { persistState } from '@datorama/akita';

import { EventTracking, EventTrackingUserType } from '@picpay/event-tracking';
import { throwError } from 'rxjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
    enableProdMode();
}

const providers = [{ provide: 'seller', useValue: persistState() }];

platformBrowserDynamic(providers)
    .bootstrapModule(AppModule)
    .catch(err => throwError(err));

EventTracking.init({
    production: environment.production,
    userType: EventTrackingUserType.SELLER,
});
