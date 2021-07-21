import { TestBed } from '@angular/core/testing';

import { UiQuery } from './ui.query';
import { UiService } from './ui.service';

describe('UiService', () => {
    let service: UiService;
    let query: UiQuery;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UiService);
        query = TestBed.inject(UiQuery);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should dectect mobile', () => {
        service.detectMobile();
        query.isMobile$.subscribe(isMobile => {
            expect(isMobile).toBe(true);
        });
    });

    it('should dectect desktop', () => {
        query.isMobile$.subscribe(isMobile => {
            expect(isMobile).toBe(false);
        });
    });

    it('should be destroyed', () => {
        expect(service.ngOnDestroy).toBeDefined();
        service.ngOnDestroy();
    });
});
