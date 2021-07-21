import { BreadcrumbStore } from './breadcrumb.store';

describe('BreadcrumbStore', () => {
    let store: BreadcrumbStore;

    beforeEach(() => {
        store = new BreadcrumbStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });
});
