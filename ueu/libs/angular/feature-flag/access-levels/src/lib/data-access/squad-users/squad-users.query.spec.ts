import { SquadUsersQuery } from './squad-users.query';
import { SquadUsersStore } from './squad-users.store';

describe('UsersAccessLevelsQuery', () => {
    let query: SquadUsersQuery;

    beforeEach(() => {
        query = new SquadUsersQuery(new SquadUsersStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have filter$ observable', () => {
        expect(query.filter$).toBeDefined();
    });

    it('should have roles$ observable', () => {
        expect(query.roles$).toBeDefined();
    });

    it('should have activeSquadId$ observable', () => {
        expect(query.activeSquadId$).toBeDefined();
    });

    it('should have filteredUser$ observable', () => {
        expect(query.filteredUser$).toBeDefined();
    });
});
