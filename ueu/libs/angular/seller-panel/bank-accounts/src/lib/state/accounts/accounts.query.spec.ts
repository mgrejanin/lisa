import { AccountsQuery } from './accounts.query';
import { AccountsStore } from './accounts.store';

describe('AccountsQuery', () => {
    let query: AccountsQuery;

    beforeEach(() => {
        query = new AccountsQuery(new AccountsStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have isLoading$ observable', () => {
        expect(query.isLoading$).toBeDefined();
    });

    it('should have hasError$ observable', () => {
        expect(query.hasError$).toBeDefined();
    });

    it('should have accounts$ observable', () => {
        expect(query.accounts$).toBeDefined();
    });

    it('should have currentAccount$ observable', () => {
        expect(query.currentAccount$).toBeDefined();
    });
});
