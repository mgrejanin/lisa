import { SquadsStore } from './squads.store';

describe('AccessLevelsStore', () => {
    let store: SquadsStore;

    beforeEach(() => {
        store = new SquadsStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });
});
