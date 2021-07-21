import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SellerQuery, SellerQueryMock } from '@picpay/seller-panel/services';

import { B2PGuard } from './b2p.guard';

describe('B2PGuard', () => {
    let guard: B2PGuard;
    let sellerQuery: SellerQuery;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [{ provide: SellerQuery, useClass: SellerQueryMock }],
        });

        guard = TestBed.inject(B2PGuard);
        sellerQuery = TestBed.inject(SellerQuery);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should active route when b2p is true', () => {
        spyOn(sellerQuery, 'getValue').and.returnValue({ b2p: { enabled: true } });

        expect(sellerQuery.getValue().b2p.enabled).toBeTruthy();
        expect(guard.canActivate()).toBeTruthy();
    });

    it('should do not active route when b2p is false', () => {
        spyOn(sellerQuery, 'getValue').and.returnValue({ b2p: { enabled: false } });

        expect(sellerQuery.getValue().b2p.enabled).toBeFalsy();
        expect(guard.canActivate()).toBeInstanceOf(UrlTree);
    });
});
