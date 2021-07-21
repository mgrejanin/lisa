import { EventTracking, EventTrackingUserType } from '@picpay/event-tracking';
import { defineCustomElements } from '../../../../dist/libs/stencil/design-system/loader/index';
import { environment } from './environments/environment';

EventTracking.init({
    userType: EventTrackingUserType.CONSUMER,
    production: environment.production,
});

(function () {
    defineCustomElements();
})();
