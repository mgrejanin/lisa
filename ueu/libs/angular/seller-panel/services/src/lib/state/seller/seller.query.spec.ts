import { TestBed } from '@angular/core/testing';
import { SellerQuery } from './seller.query';
import { SellerStore } from './seller.store';

describe('SellerQuery', () => {
    let query: SellerQuery;
    let sellerStore: SellerStore;

    beforeEach(() => {
        sellerStore = TestBed.inject(SellerStore);
        query = new SellerQuery(sellerStore);
        sellerStore.update({
            organization: {
                type: 'biz',
            },
        });
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have organization$ observable', () => {
        expect(query.organization$).toBeDefined();
    });

    it('should have responsible$ observable', () => {
        expect(query.responsible$).toBeDefined();
    });

    it('should have ecommerce$ observable', () => {
        expect(query.ecommerce$).toBeDefined();
    });

    it('should have plan$ observable', () => {
        expect(query.plan$).toBeDefined();
    });

    it('should have address$ observable', () => {
        expect(query.address$).toBeDefined();
    });

    it('should have user$ observable', () => {
        expect(query.user$).toBeDefined();
    });

    it('should have hasBranch$ observable', () => {
        expect(query.hasBranch$).toBeDefined();
    });

    it('should have hasSellerAccount$ observable', () => {
        expect(query.hasSellerAccount$).toBeDefined();
    });

    it('should have biometry$ observable', () => {
        expect(query.biometry$).toBeDefined();
    });

    it('should have completed$ observable', () => {
        expect(query.completed$).toBeDefined();
    });

    it('should have a getUserRoles method', () => {
        expect(query.getUserRoles()).toEqual(['biz']);
    });

    it('should have a getUserRoles method returns null', () => {
        sellerStore.update({
            organization: {},
        });
        expect(query.getUserRoles()).toBeNull();
    });
});
