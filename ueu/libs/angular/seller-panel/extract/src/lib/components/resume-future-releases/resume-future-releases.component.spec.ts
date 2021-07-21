import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from '@picpay/seller-panel/shared';
import { EventTrackingService } from '@picpay/seller-panel/services';
import { MockComponent, MockModule } from 'ng-mocks';
import { ResumeFutureReleasesComponent } from './resume-future-releases.component';

describe('ResumeFutureReleasesComponent', () => {
    let component: ResumeFutureReleasesComponent;
    let fixture: ComponentFixture<ResumeFutureReleasesComponent>;
    let eventTracking: EventTrackingService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ResumeFutureReleasesComponent,
                MockComponent(MatSpinner),
                MockComponent(LoadingSpinnerComponent),
            ],
            imports: [MockModule(MatIconModule)],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResumeFutureReleasesComponent);
        eventTracking = TestBed.inject(EventTrackingService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call eventTracking function', () => {
        const evntTracking = spyOn(eventTracking, 'eventTrackingUserCliked');
        component.eventTrackingClicked();

        expect(evntTracking).toHaveBeenCalled();
    });
});
