import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SellerUser } from '@picpay/seller-panel/helpers';
import { SellerQuery, SellerQueryMock } from '@picpay/seller-panel/services';

import { BizGuard } from './biz.guard';

describe('BizGuard', () => {
    let guard: BizGuard;
    let sellerQuery: SellerQuery;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [{ provide: SellerQuery, useClass: SellerQueryMock }],
        });

        guard = TestBed.inject(BizGuard);
        sellerQuery = TestBed.inject(SellerQuery);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should active route when type biz', () => {
        spyOn(sellerQuery, 'getValue').and.returnValue({ organization: { type: 'biz' } });

        expect(sellerQuery.getValue().organization.type === SellerUser.BIZ).toBe(true);
        expect(guard.canActivate()).toBe(true);
    });

    it('should do not active route when type different of biz', () => {
        spyOn(sellerQuery, 'getValue').and.returnValue({ organization: { type: 'ecommerce' } });

        expect(sellerQuery.getValue().organization.type === SellerUser.BIZ).toBe(false);
        expect(guard.canActivate()).toBeInstanceOf(UrlTree);
    });
});
