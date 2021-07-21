import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { transaction } from '@datorama/akita';
import { Observable, throwError } from 'rxjs';
import { catchError, map, pluck, tap } from 'rxjs/operators';

import { RequestResponse, SellerQuery } from '@picpay/seller-panel/services';

import { SellerAccessConfig } from '@picpay/seller-panel/seller-access';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { AccountsStore } from './accounts.store';
import { Account, CheckAccountError } from '../../models';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

@Injectable({ providedIn: 'root' })
export class AccountsService {
    constructor(
        private http: HttpClient,
        private accountsStore: AccountsStore,
        private notificationService: NotificationsService,
        protected config: CoreDataAccessService<SellerAccessConfig>,
        private sellerQuery: SellerQuery,
    ) {}

    clearAccountsStore(): void {
        this.accountsStore.reset();
    }

    setCurrentAccount(account: Account): void {
        this.accountsStore.update({ currentAccount: account });
    }

    clearCurrentAccount(): void {
        this.accountsStore.update({ currentAccount: {} });
    }

    toggleError(hasError: boolean): void {
        this.accountsStore.update({ hasError });
    }

    addAccount(account: Account): void {
        this.accountsStore.addAccount(account);

        if (account?.main) {
            this.accountsStore.updatePrincipalAccountById(account.id);
        }
    }

    updateAccount(account: Account): void {
        this.accountsStore.updateAccount(account);

        if (account?.main) {
            this.accountsStore.updatePrincipalAccountById(account.id);
        }
    }

    @transaction()
    setAccountAsPrincipal(id: number): Observable<Account> {
        this.accountsStore.update({ isLoading: true, hasError: false });

        return this.http.put<Account>(`${this.config.getConfig().apiUrl}/banks/accounts/isprimary/${id}`, {}).pipe(
            tap(response => {
                this.accountsStore.update({ isLoading: false, hasError: false });
                this.accountsStore.updatePrincipalAccountById(response.id);
            }),
            catchError(error => {
                this.accountsStore.update({ isLoading: false, hasError: true });
                return throwError(error);
            }),
        );
    }

    @transaction()
    getAccounts(): Observable<RequestResponse<Account[]>> {
        this.accountsStore.update({ isLoading: true, hasError: false });

        return this.http.get<RequestResponse<Account[]>>(`${this.config.getConfig().apiUrl}/v2/banks/accounts`).pipe(
            tap(response => {
                this.accountsStore.updateAccounts(response.data);
                this.accountsStore.update({ isLoading: false, hasError: false });
            }),
            catchError(error => {
                this.accountsStore.update({ isLoading: false, hasError: true });
                this.accountsStore.setError(error.title);
                return throwError(error);
            }),
        );
    }

    createAccount(body: Account): Observable<RequestResponse<Account>> {
        this.accountsStore.update({ isLoading: true, hasError: false });

        return this.http
            .post<RequestResponse<Account>>(`${this.config.getConfig().apiUrl}/v2/banks/accounts`, body)
            .pipe(
                tap(() => {
                    this.accountsStore.update({ isLoading: false, hasError: false });
                }),
                catchError(error => {
                    this.accountsStore.update({ isLoading: false, hasError: true });
                    return throwError(error);
                }),
            );
    }

    editAccount(id: number, body): Observable<RequestResponse<Account>> {
        this.accountsStore.update({ isLoading: true, hasError: false });
        return this.http
            .put<RequestResponse<Account>>(`${this.config.getConfig().apiUrl}/v2/banks/accounts/${id}`, body)
            .pipe(
                tap(() => {
                    this.accountsStore.update({ isLoading: false, hasError: false });
                }),
                catchError(error => {
                    this.accountsStore.update({ isLoading: false, hasError: true });
                    return throwError(error);
                }),
            );
    }

    @transaction()
    removeAccount(id: number): Observable<RequestResponse<Account>> {
        this.accountsStore.update({ isLoading: true });

        return this.http
            .delete<RequestResponse<Account>>(`${this.config.getConfig().apiUrl}/v2/banks/accounts/${id}`)
            .pipe(
                tap(response => {
                    this.accountsStore.removeAccountById(response.data.id);
                    this.accountsStore.update({ isLoading: false, hasError: false });
                    this.notificationService.openSnackbar('A conta foi excluída com sucesso!', SnackbarTypes.DONE);
                }),
                catchError(error => {
                    this.accountsStore.update({ isLoading: false, hasError: true });
                    return throwError(error);
                }),
            );
    }

    checkAccounts(): Observable<CheckAccountError> {
        return this.http
            .get<CheckAccountError>(`${this.config.getConfig().apiUrl}/banks/accounts/check`)
            .pipe(pluck('data'));
    }

    checkLockAccounts(): Observable<{ lock_is_enabled?: boolean }> {
        const cpfCnpj = this.sellerQuery.getValue()?.organization?.cpfCnpj;
        return this.http
            .get<{ lock_is_enabled?: boolean }>(
                `${this.config.getConfig().apiUrl}/bank-residence/check-lock/${cpfCnpj}`,
            )
            .pipe(
                tap(response => {
                    this.accountsStore.update({
                        hasHangsAccount: response.lock_is_enabled,
                    });
                }),
                catchError(error => {
                    this.accountsStore.update({
                        isLoading: false,
                        hasError: true,
                        hasHangsAccount: false,
                    });
                    return throwError(error);
                }),
            );
    }

    unlockAccounts(): Observable<boolean> {
        this.accountsStore.update({ isLoading: true });
        const cpfCnpj = this.sellerQuery.getValue()?.organization?.cpfCnpj;
        const seller_id = this.sellerQuery.getValue()?.organization?.id;
        return this.http
            .post<{ success: boolean }>(
                `${this.config.getConfig().apiUrl}/bank-residence/residence-unlock/${cpfCnpj}`,
                { seller_id },
            )
            .pipe(
                map(response => {
                    this.accountsStore.update({
                        isLoading: false,
                        hasError: false,
                        hasHangsAccount: !response.success,
                    });
                    return response.success;
                }),
                catchError(error => {
                    this.accountsStore.update({
                        isLoading: false,
                        hasError: true,
                    });
                    return throwError(error);
                }),
            );
    }
}
