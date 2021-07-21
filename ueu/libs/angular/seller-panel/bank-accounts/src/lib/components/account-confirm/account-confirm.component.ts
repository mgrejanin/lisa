import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AccountsQuery } from '../../state/accounts/accounts.query';
import { BanksQuery } from '../../state/banks/banks.query';
import { Account, Bank } from '../../models';

@Component({
    selector: 'seller-panel-account-confirm',
    templateUrl: './account-confirm.component.html',
    styleUrls: ['./account-confirm.component.scss'],
})
export class AccountConfirmComponent {
    readonly currentAccount$: Observable<Account>;
    readonly currentBank$: Observable<Bank>;

    constructor(private banksQuery: BanksQuery, private accountsQuery: AccountsQuery) {
        this.currentAccount$ = this.accountsQuery.currentAccount$;
        this.currentBank$ = this.banksQuery.selectedBank$;
    }
}
