import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

// akita
import { setLoading } from '@datorama/akita';

// store components
import { ProductsStore } from './products.store';

// rxjs
import { Observable, Subject, throwError } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

// data-access
import { Panel, Product, SwaggerDoc } from '../../models';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { Router } from '@angular/router';
import { DevPortalDataAccessConfig } from '../dev-portal-data-access.config';
// services

// interfaces

interface ResponseAPI {
    message: string;
    data: Product[] | Panel[];
}

@Injectable({ providedIn: 'root' })
export class ProductsService implements OnDestroy {
    private readonly panelUnsubscribe$: Subject<void>;
    private readonly productUnsubscribe$: Subject<void>;

    constructor(
        private config: CoreDataAccessService<DevPortalDataAccessConfig>,
        private http: HttpClient,
        private store: ProductsStore,
        private router: Router,
    ) {
        this.productUnsubscribe$ = new Subject();
        this.panelUnsubscribe$ = new Subject();
    }

    ngOnDestroy() {
        this.productUnsubscribe$.next();
        this.productUnsubscribe$.complete();

        this.panelUnsubscribe$.next();
        this.panelUnsubscribe$.complete();
    }

    getProducts(): void {
        this.startRequest();

        this.http
            .get(`${this.config.getConfig().apiUrl}/external/v1/products?type=external`)
            .pipe(
                setLoading(this.store),
                takeUntil(this.productUnsubscribe$),
                finalize(() => {
                    this.closeRequest();
                }),
            )
            .subscribe((response: ResponseAPI) => {
                this.store.updateProducts(response.data as Product[]);
            });
    }

    getDocJson(url: string): Observable<SwaggerDoc> {
        return this.http.get<SwaggerDoc>(url);
    }

    getPanels(): void {
        this.panelUnsubscribe$.next();

        this.http
            .get(`${this.config.getConfig().apiUrl}/external/v1/panels`)
            .pipe(
                setLoading(this.store),
                takeUntil(this.panelUnsubscribe$),
                finalize(() => this.panelUnsubscribe$.next()),
            )
            .subscribe((response: ResponseAPI) => {
                this.store.updatePanels(response.data as Panel[]);
            });
    }

    /**
     *  Updates the state active product and loads the new api doc
     */
    updateCurrentProduct(slug: string, products: Product[], version?: string): void {
        const filteredProducts: Product[] = products.filter(item => item.slug === slug);

        if (filteredProducts.length > 0) {
            const currentProduct: Product = filteredProducts[0];
            const apiUrl: string = this.getCurrentProductDocUrl(currentProduct, version);
            this.updateDocumentationLoadStatus(true);
            this.store.updateApiUrl(apiUrl);
            this.store.updateActiveProduct(currentProduct);
            return;
        }

        this.router.navigate(['pagina-nao-encontrada']).catch(error => throwError(error));
    }

    /**
     *  Updates the state documentation load error status
     */
    updateDocumentationLoadStatus(isLoaded: boolean): void {
        this.store.updateDocLoadSuccess(isLoaded);
    }

    /**
     * Returns the current product documentation path, if type
     * is externaland environment is QA for local or production for Prod
     *
     * @param product - the current product based on the URL slug
     * @param version - optional - the version of the documentation requested
     * @returns a string with the documentation path (example: /external/v1/documentations/DOC_ID/content)
     */
    getCurrentProductDocUrl(product: Product, version?: string): string {
        const docEnv = this.config.getConfig().release;
        const baseUrl = this.config.getConfig().apiUrl;
        // Default url
        let url = '';

        if (product && product.documentations.length) {
            let documentationIndex = 0;
            // The spread with Set here is only for precaution, in case we
            // have multiple versions with the same name
            const allVersions: string[] = [
                ...new Set(product.documentations.map(({ version }) => version)),
            ] as string[];
            const filteredArray = product.documentations.filter(
                item => item.environment === docEnv && item.type === 'external',
            );
            if (filteredArray.length) {
                // If we receive the version parameter and we have multiple doc
                // versions inside the docs array, then the index must match
                if (version && allVersions.length > 1) {
                    documentationIndex = filteredArray.findIndex(item => item.version === version);
                }
                url = `${baseUrl}/external/v1/documentations/${filteredArray[documentationIndex].id}/content`;
            }
            this.store.updateDocVersions(allVersions);
        }
        return url;
    }

    // Private helpers
    private startRequest(): void {
        this.productUnsubscribe$.next();

        this.store.setLoading(true);
        this.store.update({ isProductLoading: true });
    }

    private closeRequest(): void {
        this.productUnsubscribe$.next();

        this.store.setLoading(false);
        this.store.update({ isProductLoading: false });
    }
}
