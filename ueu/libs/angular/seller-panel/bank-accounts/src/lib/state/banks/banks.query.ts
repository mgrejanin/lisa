import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Query } from '@datorama/akita';

import { BanksState, BanksStore } from './banks.store';
import { Bank } from '../../models';

@Injectable({ providedIn: 'root' })
export class BanksQuery extends Query<BanksState> {
    selectedBank$: Observable<Bank>;
    banks$: Observable<Bank[]>;
    isLoading$: Observable<boolean>;
    loadedError$: Observable<boolean>;

    constructor(protected store: BanksStore) {
        super(store);

        this.selectedBank$ = this.select('selectedBank');
        this.banks$ = this.select('banks');
        this.isLoading$ = this.select('isLoading');
        this.loadedError$ = this.select('loadedError');
    }
}
