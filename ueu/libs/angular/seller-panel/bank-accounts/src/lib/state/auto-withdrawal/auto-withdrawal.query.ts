import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Query } from '@datorama/akita';

import { filter, map } from 'rxjs/operators';

import { InfoWithDrawal } from '../../models/auto-withdrawal.model';
import { AutoWithdrawalState, AutoWithdrawalStore } from './auto-withdrawal.store';

@Injectable({ providedIn: 'root' })
export class AutoWithdrawalQuery extends Query<AutoWithdrawalState> {
    readonly infoWithdrawal$: Observable<InfoWithDrawal>;
    readonly isCheck$: Observable<boolean>;
    readonly price$: Observable<number>;
    readonly isLoading$: Observable<boolean>;
    readonly isError$: Observable<boolean>;

    constructor(protected store: AutoWithdrawalStore) {
        super(store);

        this.infoWithdrawal$ = this.select('infoWithdrawal');
        this.isCheck$ = this.select('infoWithdrawal').pipe(
            filter(info => !!info),
            map(info => info.automatic_bank_account),
        );
        this.price$ = this.select('infoWithdrawal').pipe(
            filter(info => !!info),
            map(info => info.available_for_withdrawal),
        );
        this.isLoading$ = this.select('isLoading');
        this.isError$ = this.select('isError');
    }
}
