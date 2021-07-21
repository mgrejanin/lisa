import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// directives
import { TrackClickDirective } from './track-click.directive';

// // services
import { EventTracking } from '@picpay/event-tracking';

// DUMMY COMPONENT
@Component({
    template: `<button
        type="text"
        picpayTrackClick
        [eventName]="'Test Click'"
        [eventPayload]="{ test_parameter: 'test value' }"
    ></button> `,
})
class DummyTrackComponent {}

describe('Directive: TrackEvent', () => {
    let fixture: ComponentFixture<DummyTrackComponent>;
    let component: DummyTrackComponent;
    let directive: TrackClickDirective;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DummyTrackComponent, TrackClickDirective],
        });

        fixture = TestBed.createComponent(DummyTrackComponent);
        component = fixture.componentInstance;

        directive = fixture.debugElement.query(By.directive(TrackClickDirective)).injector.get(TrackClickDirective);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(directive).toBeTruthy();
    });

    it('trackClick should be called when the host is clicked', () => {
        const trackSpy = spyOn(directive, 'trackClick');

        const button = fixture.debugElement.query(By.css('button'));
        button.triggerEventHandler('click', null);

        expect(trackSpy).toHaveBeenCalled();
    });

    it('should trackEvent with inputs', () => {
        const tracking = spyOn(EventTracking, 'track');

        const button = fixture.debugElement.query(By.css('button'));
        button.triggerEventHandler('click', null);

        expect(tracking).toHaveBeenCalledWith('Test Click', { test_parameter: 'test value' });
    });
});
