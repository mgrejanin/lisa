import { ProductsStore } from './products.store';

// interfaces
import { Documentation, Panel, Product } from '../../models';

describe('ProductsStore', () => {
    let store: ProductsStore;

    beforeEach(() => {
        store = new ProductsStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should have updateProducts function', () => {
        const updateSpy = spyOn(store, 'update');

        const dockMock: Documentation = { id: 1, type: 'doc type', url: 'doc link', environment: 'production' };
        const mockProducts: Product[] = [
            {
                id: 1,
                category: 'category',
                name: 'product name',
                description: 'product desc',
                slug: 'product_slug',
                panel_url: 'external_link_to_the_panel',
                documentations: [dockMock],
            },
        ];

        store.updateProducts(mockProducts);

        expect(updateSpy).toHaveBeenCalledWith({ products: mockProducts });
    });

    it('should have updateActiveProduct function', () => {
        const updateSpy = spyOn(store, 'update');

        const dockMock: Documentation = { id: 2, type: 'doc type', url: 'doc link', environment: 'production' };
        const product: Product = {
            id: 2,
            category: 'category',
            name: 'product name',
            description: 'product desc',
            slug: 'product_slug',
            panel_url: 'external_link_to_the_panel',
            documentations: [dockMock],
        };

        store.updateActiveProduct(product);

        expect(updateSpy).toHaveBeenCalledWith({ activeProduct: product });
    });

    it('should have updateApiUrl function', () => {
        const updateSpy = spyOn(store, 'update');

        const activeProductApiUrl = 'http://fake.url';

        store.updateApiUrl(activeProductApiUrl);

        expect(updateSpy).toHaveBeenCalledWith({ activeProductApiUrl });
    });

    it('should have updatePanels function', () => {
        const updateSpy = spyOn(store, 'update');

        const panels: Panel[] = [
            {
                url: 'url.1',
                description: 'desc.1',
                name: 'name.1',
            },
            {
                url: 'url.2',
                description: 'desc.2',
                name: 'name.2',
            },
        ];

        store.updatePanels(panels);

        expect(updateSpy).toHaveBeenCalledWith({ panels });
    });
});
