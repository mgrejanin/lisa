import { AuthStore } from './auth.store';

describe('AuthStore', () => {
    let store: AuthStore;

    beforeEach(() => {
        store = new AuthStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should have updateRedirectUrl function', () => {
        expect(store.updateRedirectUrl).toBeDefined();

        const spy = spyOn(store, 'update');
        const mockUrl = 'testUrl';

        store.updateRedirectUrl(mockUrl);

        expect(spy).toHaveBeenCalledWith({ redirectUrl: mockUrl });
    });
});
