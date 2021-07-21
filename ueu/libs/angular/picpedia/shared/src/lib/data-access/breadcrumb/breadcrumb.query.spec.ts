import { BreadcrumbQuery } from './breadcrumb.query';
import { BreadcrumbStore } from './breadcrumb.store';

describe('BreadcrumbQuery', () => {
    let query: BreadcrumbQuery;

    beforeEach(() => {
        query = new BreadcrumbQuery(new BreadcrumbStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have isLoading$ observable', () => {
        expect(query.isLoading$).toBeDefined();
    });

    it('should have breadcrumbs$ observable', () => {
        expect(query.breadcrumbs$).toBeDefined();
    });
});
