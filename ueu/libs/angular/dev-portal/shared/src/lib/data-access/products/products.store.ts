import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Panel, Product } from '../../models';

export interface ProductsState {
    activeProduct: Product;
    activeProductApiUrl: string;
    panels: Panel[];
    products: Product[];
    isProductLoading: boolean;
    isDocLoading: boolean;
    docLoadSuccess: boolean;
    docVersions: string[];
}

export function createInitialState(): ProductsState {
    return {
        activeProduct: null,
        activeProductApiUrl: null,
        products: [],
        panels: [],
        isProductLoading: false,
        isDocLoading: false,
        docLoadSuccess: true,
        docVersions: [],
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'products' })
export class ProductsStore extends Store<ProductsState> {
    constructor() {
        super(createInitialState());
    }

    updateProducts(products: Product[]): void {
        this.update({ products });
    }

    updatePanels(panels: Panel[]): void {
        this.update({ panels });
    }

    updateActiveProduct(activeProduct: Product): void {
        this.update({ activeProduct });
    }

    updateApiUrl(activeProductApiUrl: string): void {
        this.update({ activeProductApiUrl });
    }

    updateDocLoadSuccess(docLoadSuccess: boolean): void {
        this.update({ docLoadSuccess });
    }

    updateDocVersions(docVersions: string[]): void {
        this.update({ docVersions });
    }
}
