// store components
import { AuthQuery } from './auth.query';
import { AuthStore } from './auth.store';

describe('AuthQuery', () => {
    let store: AuthStore;
    let query: AuthQuery;

    beforeEach(() => {
        store = new AuthStore();
        query = new AuthQuery(store);
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have roles$ observable', () => {
        expect(query.roles$).toBeDefined();
    });

    it('should have user$ observable', () => {
        expect(query.user$).toBeDefined();
    });
});
