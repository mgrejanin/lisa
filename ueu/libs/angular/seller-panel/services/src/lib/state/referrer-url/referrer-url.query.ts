import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ReferrerUrlStore, ReferrerUrlState } from './referrer-url.store';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReferrerUrlQuery extends Query<ReferrerUrlState> {
    readonly urlReferrer$: Observable<string>;

    constructor(protected store: ReferrerUrlStore) {
        super(store);
        this.urlReferrer$ = this.select('url');
    }
}
