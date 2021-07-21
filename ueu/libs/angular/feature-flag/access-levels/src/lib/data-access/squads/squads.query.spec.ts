import { SquadsQuery } from './squads.query';
import { SquadsStore } from './squads.store';

describe('AccessLevelsQuery', () => {
    let query: SquadsQuery;

    beforeEach(() => {
        query = new SquadsQuery(new SquadsStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have filter$ observable', () => {
        expect(query.filter$).toBeDefined();
    });

    it('should have filteredSquads$ observable', () => {
        expect(query.filteredSquads$).toBeDefined();
    });

    it('should have squads$ observable', () => {
        expect(query.squads$).toBeDefined();
    });
});
