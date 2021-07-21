import { UiQuery } from './ui.query';
import { UiStore } from './ui.store';

describe('UiQuery', () => {
    let query: UiQuery;

    beforeEach(() => {
        query = new UiQuery(new UiStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have isMobile$ observable', () => {
        expect(query.isMobile$).toBeDefined();
    });

    it('should have isSafari$ observable', () => {
        expect(query.isSafari$).toBeDefined();
    });
});
