import { RechargesQuery } from './recharges.query';
import { RechargesStore } from './recharges.store';

describe('RechargesQuery', () => {
    let query: RechargesQuery;

    beforeEach(() => {
        query = new RechargesQuery(new RechargesStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have recharges$ observable', () => {
        expect(query.recharges$).toBeDefined();
    });

    it('should have totalRecharges$ observable', () => {
        expect(query.totalRecharges$).toBeDefined();
    });

    it('should have isLoading$ observable', () => {
        expect(query.isLoading$).toBeDefined();
    });
});
