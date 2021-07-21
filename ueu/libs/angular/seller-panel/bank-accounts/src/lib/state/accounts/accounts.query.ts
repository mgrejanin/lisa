import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Query } from '@datorama/akita';

import { AccountsState, AccountsStore } from './accounts.store';
import { Account } from '../../models';

@Injectable({ providedIn: 'root' })
export class AccountsQuery extends Query<AccountsState> {
    isLoading$: Observable<boolean>;
    hasError$: Observable<boolean>;
    accounts$: Observable<Account[]>;
    currentAccount$: Observable<Account>;
    hasHangsAccount$: Observable<boolean>;

    constructor(protected store: AccountsStore) {
        super(store);

        this.isLoading$ = this.select('isLoading');
        this.accounts$ = this.select('accounts');
        this.hasError$ = this.select('hasError');
        this.currentAccount$ = this.select('currentAccount');
        this.hasHangsAccount$ = this.select('hasHangsAccount');
    }
}
