import { Inject, Injectable, Injector } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { EventTracking } from '@picpay/event-tracking';

@Injectable()
export class RouteChangeTrackerService {
    previousRoute: string;
    actualRoute: string;

    private get router() {
        return this.injector.get(Router);
    }

    constructor(@Inject(Injector) private injector: Injector) {
        this.previousRoute = '';
        this.actualRoute = '';
    }

    routeChangeListenerInitializer(): void {
        this.router.events.subscribe(routeData => {
            if (routeData instanceof NavigationStart) {
                this.previousRoute = this.actualRoute;
            }

            if (routeData instanceof NavigationEnd) {
                this.setActualRoute(this.router.routerState.snapshot.url);
                this.trackNavigate();
            }
        });
    }

    private setActualRoute(actualRoute: string): void {
        this.actualRoute = actualRoute;
        if (actualRoute.includes('?')) {
            this.actualRoute = this.actualRoute.substr(0, this.actualRoute.indexOf('?'));
        }
    }

    private trackNavigate(): void {
        EventTracking.page('Page Viewed', {
            page_name: this.actualRoute,
            page_title: document.title,
            page_url: `${window.origin}${this.actualRoute}`,
            referrer_url: `${window.origin}${this.previousRoute}`,
            search_parameters: window.location.search.substring(1),
            user_agent: window.navigator.userAgent,
        });
    }
}
