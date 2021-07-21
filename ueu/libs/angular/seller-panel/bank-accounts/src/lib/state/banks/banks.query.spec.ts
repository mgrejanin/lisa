import { BanksQuery } from './banks.query';
import { BanksStore } from './banks.store';

describe('BanksQuery', () => {
    let query: BanksQuery;

    beforeEach(() => {
        query = new BanksQuery(new BanksStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have isLoading$ observable', () => {
        expect(query.isLoading$).toBeDefined();
    });

    it('should have banks$ observable', () => {
        expect(query.banks$).toBeDefined();
    });

    it('should have selectedBank$ observable', () => {
        expect(query.selectedBank$).toBeDefined();
    });

    it('should have loadedError$ observable', () => {
        expect(query.loadedError$).toBeDefined();
    });
});
