import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';

// services
import { RouteChangeTrackerService } from './services/route-change-tracker.service';

function getRouteChangeListenerInitializer(route: RouteChangeTrackerService) {
    return route.routeChangeListenerInitializer.bind(route);
}
@NgModule({
    imports: [CommonModule],
})
export class SharedTrackEventsModule {
    static forRoot(): ModuleWithProviders<SharedTrackEventsModule> {
        return {
            ngModule: SharedTrackEventsModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    multi: true,
                    useFactory: getRouteChangeListenerInitializer,
                    deps: [RouteChangeTrackerService],
                },
                RouteChangeTrackerService,
            ],
        };
    }
}
