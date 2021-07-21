import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

// services
import { EventTracking } from '@picpay/event-tracking';
import { RouteChangeTrackerService } from './route-change-tracker.service';

// DUMMY COMPONENT
@Component({
    template: ``,
})
class DummyComponent {}

describe('RouteChangeTrackerService', () => {
    let service: RouteChangeTrackerService;

    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DummyComponent],
            imports: [RouterTestingModule.withRoutes([{ path: '', component: DummyComponent }])],
            providers: [RouteChangeTrackerService],
        });

        service = TestBed.inject(RouteChangeTrackerService);
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    it('routeChangeListenerInitializer function: should subscribe to router events', () => {
        const eventsSpy = spyOn(router.events, 'subscribe').and.callThrough();

        service.routeChangeListenerInitializer();

        expect(eventsSpy).toHaveBeenCalled();
    });

    it('routeChangeListenerInitializer function: should track on navigation based on route data', async () => {
        // creating the tracking service spies
        const evtTracking = spyOn(EventTracking, 'page');

        // initializing the subscription to router events
        service.routeChangeListenerInitializer();

        // navigating
        await router.navigateByUrl('');

        expect(evtTracking).toHaveBeenCalledWith('Page Viewed', {
            page_name: '/',
            page_title: '',
            page_url: `http://localhost/`,
            referrer_url: `http://localhost`,
            search_parameters: '',
            user_agent: window.navigator.userAgent,
        });
    });
});
