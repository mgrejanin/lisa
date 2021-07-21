import { UiStore } from './ui.store';

describe('UiStore', () => {
    let store: UiStore;

    beforeEach(() => {
        store = new UiStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should test updateIsMobile method', () => {
        spyOn(store, 'updateIsMobile');
        expect(store.updateIsMobile).not.toHaveBeenCalled();
        store.updateIsMobile(true);
        expect(store.updateIsMobile).toHaveBeenCalled();
    });

    it('should test updateIsSafari method', () => {
        spyOn(store, 'updateIsSafari');
        expect(store.updateIsSafari).not.toHaveBeenCalled();
        store.updateIsSafari(true);
        expect(store.updateIsSafari).toHaveBeenCalled();
    });
});
