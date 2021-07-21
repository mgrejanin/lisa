import { Injectable } from '@angular/core';

import { BreadcrumbState, BreadcrumbStore } from './breadcrumb.store';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
    constructor(private breadcrumbStore: BreadcrumbStore) {}

    update(newState: Partial<BreadcrumbState>): void {
        this.breadcrumbStore.update(newState);
    }
}
