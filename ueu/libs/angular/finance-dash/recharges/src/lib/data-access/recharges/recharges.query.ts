import { Injectable } from '@angular/core';
// akita
import { Query } from '@datorama/akita';
// interfaces
import { RechargeData } from '../../models';
// rxjs
import { Observable } from 'rxjs';

// store components
import { RechargesState, RechargesStore } from './recharges.store';

@Injectable({ providedIn: 'root' })
export class RechargesQuery extends Query<RechargesState> {
    recharges$: Observable<RechargeData[]>;
    totalRecharges$: Observable<number>;
    isLoading$: Observable<boolean>;

    constructor(protected store: RechargesStore) {
        super(store);

        this.recharges$ = this.select(state => state.recharges);
        this.totalRecharges$ = this.select(state => state.totalRecharges);
        this.isLoading$ = this.select(state => state.isLoading);
    }
}
