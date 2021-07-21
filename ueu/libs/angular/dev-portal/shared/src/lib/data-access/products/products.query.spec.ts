import { ProductsQuery } from './products.query';
import { ProductsStore } from './products.store';

describe('ProductsQuery', () => {
    let query: ProductsQuery;

    beforeEach(() => {
        query = new ProductsQuery(new ProductsStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have products$ observable', () => {
        expect(query.products$).toBeDefined();
    });

    it('should have activeProduct$ observable', () => {
        expect(query.activeProduct$).toBeDefined();
    });

    it('should have activeProductApiUrl$ observable', () => {
        expect(query.activeProductApiUrl$).toBeDefined();
    });

    it('should have panels$ observable', () => {
        expect(query.panels$).toBeDefined();
    });

    it('should have isProductLoading$ observable', () => {
        expect(query.isProductLoading$).toBeDefined();
    });

    it('should have isProductLoading$ observable', () => {
        expect(query.isProductLoading$).toBeDefined();
    });
});
