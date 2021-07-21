import { AutoWithdrawalStore } from './auto-withdrawal.store';

describe('AccountsStore', () => {
    let store: AutoWithdrawalStore;

    beforeEach(() => {
        store = new AutoWithdrawalStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });
});
