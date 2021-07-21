import { ReferrerUrlStore } from './referrer-url.store';

describe('ReferrerUrlStore', () => {
    let store: ReferrerUrlStore;

    beforeEach(() => {
        store = new ReferrerUrlStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });
});
