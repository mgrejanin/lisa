import { Injectable } from '@angular/core';

// akita
import { Query } from '@datorama/akita';

// store components
import { ProductsState, ProductsStore } from './products.store';

// rxjs
import { Observable } from 'rxjs';

// interfaces
import { Panel, Product } from '../../models';

@Injectable({ providedIn: 'root' })
export class ProductsQuery extends Query<ProductsState> {
    activeProduct$: Observable<Product>;
    activeProductApiUrl$: Observable<string>;
    products$: Observable<Product[]>;
    panels$: Observable<Panel[]>;
    isProductLoading$: Observable<boolean>;
    isDocLoading$: Observable<boolean>;
    docLoadSuccess$: Observable<boolean>;
    docVersions$: Observable<string[]>;

    constructor(protected store: ProductsStore) {
        super(store);

        this.activeProduct$ = this.select(state => state.activeProduct);
        this.activeProductApiUrl$ = this.select(state => state.activeProductApiUrl);
        this.panels$ = this.select(state => state.panels);
        this.products$ = this.select(state => state.products);
        this.isProductLoading$ = this.select(state => state.isProductLoading);
        this.isDocLoading$ = this.select(state => state.isDocLoading);
        this.docLoadSuccess$ = this.select(state => state.docLoadSuccess);
        this.docVersions$ = this.select(state => state.docVersions);
    }
}
