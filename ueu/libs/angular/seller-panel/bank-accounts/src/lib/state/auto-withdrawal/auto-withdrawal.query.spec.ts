import { AutoWithdrawalQuery } from './auto-withdrawal.query';
import { AutoWithdrawalStore } from './auto-withdrawal.store';

describe('WithdrawalQuery', () => {
    let query: AutoWithdrawalQuery;

    beforeEach(() => {
        query = new AutoWithdrawalQuery(new AutoWithdrawalStore());
    });

    it('should have infoWithdrawal$ observable', () => {
        expect(query.infoWithdrawal$).toBeDefined();
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have isLoading$ observable', () => {
        expect(query.isLoading$).toBeDefined();
    });

    it('should have isCheck$ observable', () => {
        expect(query.isCheck$).toBeDefined();
    });

    it('should have isError$ observable', () => {
        expect(query.isError$).toBeDefined();
    });

    it('should have price$ observable', () => {
        expect(query.price$).toBeDefined();
    });
});
