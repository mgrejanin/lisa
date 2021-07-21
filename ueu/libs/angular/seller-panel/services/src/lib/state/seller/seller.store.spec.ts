import { SellerStore } from './seller.store';

describe('SellerStore', () => {
    let store: SellerStore;

    beforeEach(() => {
        store = new SellerStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });
});
