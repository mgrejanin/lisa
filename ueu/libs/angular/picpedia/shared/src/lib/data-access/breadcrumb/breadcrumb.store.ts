import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { Breadcrumb } from './breadcrumb.model';

export interface BreadcrumbState {
    breadcrumbs: Breadcrumb[];
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'breadcrumb', resettable: true })
export class BreadcrumbStore extends EntityStore<BreadcrumbState> {
    constructor() {
        super({ breadcrumbs: [] });
    }
}
