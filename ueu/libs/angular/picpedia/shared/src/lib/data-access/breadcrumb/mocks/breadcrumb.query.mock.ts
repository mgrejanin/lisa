import { Observable, of } from 'rxjs';

import { Breadcrumb } from '../breadcrumb.model';
import { mockBreadcrumbs } from './breadcrumb.mock';

export class BreadcrumbsQueryMock {
    breadcrumbs$: Observable<Breadcrumb[]>;

    constructor() {
        this.breadcrumbs$ = of(mockBreadcrumbs);
    }
}
