import { SquadUsersStore } from './squad-users.store';

describe('UsersAccessLevelsStore', () => {
    let store: SquadUsersStore;

    beforeEach(() => {
        store = new SquadUsersStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });
});
