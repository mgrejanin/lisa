import { TestBed } from '@angular/core/testing';
import { UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SellerUser } from '@picpay/seller-panel/helpers';
import { SellerQuery, SellerQueryMock } from '@picpay/seller-panel/services';

import { EcommerceGuard } from './ecommerce.guard';

describe('EcommerceGuard', () => {
    let guard: EcommerceGuard;
    let sellerQuery: SellerQuery;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [{ provide: SellerQuery, useClass: SellerQueryMock }],
        });

        guard = TestBed.inject(EcommerceGuard);
        sellerQuery = TestBed.inject(SellerQuery);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should active route when type ecommerce', () => {
        spyOn(sellerQuery, 'getValue').and.returnValue({ organization: { type: 'ecommerce' } });

        expect(sellerQuery.getValue().organization.type === SellerUser.ECOMMERCE).toBe(true);
        expect(guard.canActivate()).toBe(true);
    });

    it('should do not active route when type different of ecommerce', () => {
        spyOn(sellerQuery, 'getValue').and.returnValue({ organization: { type: 'biz' } });

        expect(sellerQuery.getValue().organization.type === SellerUser.ECOMMERCE).toBe(false);
        expect(guard.canActivate()).toBeInstanceOf(UrlTree);
    });
});
