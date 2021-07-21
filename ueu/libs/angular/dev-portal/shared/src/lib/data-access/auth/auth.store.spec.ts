import { AuthStore } from './auth.store';

describe('AuthStore', () => {
    let store: AuthStore;

    beforeEach(() => {
        store = new AuthStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });
});
