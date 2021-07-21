import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { Account } from '../../models';

export interface AccountsState {
    isLoading: boolean;
    hasError: boolean;
    accounts: Account[];
    currentAccount: Account;
    currentTypeAccountLabel: string;
    hasHangsAccount: boolean;
}

function createInitialState(): AccountsState {
    return {
        isLoading: false,
        hasError: false,
        accounts: [],
        currentAccount: {},
        currentTypeAccountLabel: '',
        hasHangsAccount: false,
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'accounts', resettable: true })
export class AccountsStore extends Store<AccountsState> {
    constructor() {
        super(createInitialState());
    }

    addAccount(account: Account): void {
        const accounts = this.getValue().accounts;

        this.update({
            accounts: [account, ...accounts],
        });
    }

    updateAccount(account: Account) {
        let accounts = this.getValue().accounts;

        accounts = accounts.filter(accountItem => accountItem.id !== account.id);

        this.update({
            accounts: [account, ...accounts],
        });
    }

    updateAccounts(accounts: Account[]): void {
        this.update({ accounts });
    }

    updateCurrentAccount(account: Account): void {
        this.update({ currentAccount: account });
    }

    updatePrincipalAccountById(id: number): void {
        const accounts = this.getValue().accounts;

        accounts.map(account => {
            account.main = account.id === id;
        });

        this.updateAccounts(accounts);
    }

    removeAccountById(id: number): void {
        let accounts = this.getValue().accounts;

        accounts = accounts.filter(account => account.id !== id);

        this.updateAccounts(accounts);
    }
}
