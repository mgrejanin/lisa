import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReferrerUrlService } from './referrer-url.service';
import { ReferrerUrlStore } from './referrer-url.store';

describe('ReferrerUrlService', () => {
    let referrerUrlService: ReferrerUrlService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ReferrerUrlService, ReferrerUrlStore],
            imports: [HttpClientTestingModule],
        });

        referrerUrlService = TestBed.inject(ReferrerUrlService);
    });

    it('should be created', () => {
        expect(referrerUrlService).toBeDefined();
    });
});
