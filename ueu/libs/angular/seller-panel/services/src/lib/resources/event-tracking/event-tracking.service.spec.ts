import { TestBed } from '@angular/core/testing';

import { EventTrackingService } from './event-tracking.service';
import { WINDOW } from '@picpay/angular/shared/helpers';
import { DOCUMENT } from '@angular/common';
import { EventTracking } from '@picpay/event-tracking';

describe('EventTrackingService', () => {
    let service: EventTrackingService;
    let windowToken: Window;
    let documentToken: Document;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                { provide: Window, useValue: WINDOW },
                { provide: Document, useValue: DOCUMENT },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({});
        windowToken = TestBed.inject(WINDOW);
        documentToken = TestBed.inject(DOCUMENT);
        service = TestBed.inject(EventTrackingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be call eventTrackingUserClicked function', () => {
        const evtTracking = spyOn(EventTracking, 'track');
        service.eventTrackingUserCliked('BUTTON_MOCK_NAME', 'mock_page', windowToken, documentToken);

        expect(evtTracking).toHaveBeenCalledWith('User Clicked', {
            page_name: `/mock_page`,
            page_title: document.title,
            page_url: `${window.origin}/mock_page`,
            user_agent: window.navigator.userAgent,
            button_name: 'BUTTON_MOCK_NAME',
            user_id: undefined,
        });
    });
});
