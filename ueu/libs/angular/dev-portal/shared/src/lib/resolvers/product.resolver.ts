import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { ContactQuery } from '../data-access/contact/contact.query';
import { ContactService } from '../data-access/contact/contact.service';

import { ProductsQuery } from '../data-access/products/products.query';
import { ProductsService } from '../data-access/products/products.service';

import { ContactTagGroup, Panel, Product } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Subscription> {
    readonly products$: Observable<Product[]>;
    readonly panels$: Observable<Panel[]>;
    readonly tags$: Observable<ContactTagGroup>;

    constructor(
        private service: ProductsService,
        private contactService: ContactService,
        private query: ProductsQuery,
        private contactQuery: ContactQuery,
    ) {
        this.products$ = this.query.products$;
        this.panels$ = this.query.panels$;
        this.tags$ = this.contactQuery.tags$;
    }

    resolve(route: ActivatedRouteSnapshot): Subscription {
        this.panels$.subscribe(panels => {
            if (!panels.length) {
                this.service.getPanels();
            }
        });

        return this.products$.subscribe(products => {
            const slug = route.paramMap.get('slug');
            const version = route.paramMap.get('version');

            if (!products.length) {
                this.service.getProducts();
                return products;
            }
            if (slug) {
                this.service.updateCurrentProduct(slug, products, version);
            }
            return products;
        });
    }
}
