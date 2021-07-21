import { SellerQuery } from './seller.query';
import { SellerStore } from './seller.store';

describe('SellerQuery', () => {
    let query: SellerQuery;

    beforeEach(() => {
        query = new SellerQuery(new SellerStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have sellerResponsible$ observable', () => {
        expect(query.sellerResponsible$).toBeDefined();
    });

    it('should have sellerAddress$ observable', () => {
        expect(query.sellerAddress$).toBeDefined();
    });

    it('should have sellerCompany$ observable', () => {
        expect(query.sellerCompany$).toBeDefined();
    });

    it('should have sellerAddressCompany$ observable', () => {
        expect(query.sellerAddressCompany$).toBeDefined();
    });

    it('should have tokenHash$ observable', () => {
        expect(query.tokenHash$).toBeDefined();
    });

    it('should have isLoading$ observable', () => {
        expect(query.isLoading$).toBeDefined();
    });

    it('should have nameSeller$ observable', () => {
        expect(query.nameSeller$).toBeDefined();
    });

    it('should have cellSeller$ observable', () => {
        expect(query.cellSeller$).toBeDefined();
    });

    it('should have fullAddressSeller$ observable', () => {
        expect(query.fullAddressSeller$).toBeDefined();
    });
});
