import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { Breadcrumb } from './breadcrumb.model';
import { BreadcrumbState, BreadcrumbStore } from './breadcrumb.store';

@Injectable({ providedIn: 'root' })
export class BreadcrumbQuery extends QueryEntity<BreadcrumbState> {
    readonly isLoading$: Observable<boolean>;
    readonly breadcrumbs$: Observable<Breadcrumb[]>;

    constructor(protected store: BreadcrumbStore) {
        super(store);
        this.isLoading$ = this.selectLoading();
        this.breadcrumbs$ = this.select('breadcrumbs');
    }
}
