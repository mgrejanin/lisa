import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

import { SellerAccessConfig } from '@picpay/seller-panel/seller-access';
import { NewWithdraw, NewWithdrawResponse } from '@picpay/seller-panel/services';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { InfoWithDrawal } from '../../models/auto-withdrawal.model';
import { AutoWithdrawalStore } from './auto-withdrawal.store';

@Injectable({ providedIn: 'root' })
export class AutoWithdrawalService {
    private readonly unsubscribe$: Subject<void>;

    constructor(
        private withdrawalStore: AutoWithdrawalStore,
        private http: HttpClient,
        protected config: CoreDataAccessService<SellerAccessConfig>,
    ) {
        this.unsubscribe$ = new Subject();
    }

    getWithdrawalInfo(): void {
        this.unsubscribe$.next();
        this.withdrawalStore.update({ isLoading: true, isError: false });
        this.http
            .get(`${this.config.getConfig().apiUrl}/v2/withdrawals/informations`)
            .pipe(
                catchError(error => {
                    this.withdrawalStore.setError(error.title);
                    return throwError(error);
                }),
                takeUntil(this.unsubscribe$),
            )
            .subscribe(
                (response: InfoWithDrawal) => {
                    this.withdrawalStore.update({ infoWithdrawal: response, isLoading: false });
                },
                () => {
                    this.withdrawalStore.update({ isLoading: false, isError: true });
                },
            );
    }

    newWithdrawal(body: NewWithdraw): Observable<NewWithdrawResponse> {
        this.withdrawalStore.update({ isLoading: true, isError: false });

        return this.http.post<NewWithdrawResponse>(`${this.config.getConfig().apiUrl}/withdrawals`, body).pipe(
            tap(() => {
                this.withdrawalStore.update({ isLoading: false, isError: false });
            }),
            catchError(error => {
                this.withdrawalStore.update({ isLoading: false, isError: true });
                return throwError(error);
            }),
        );
    }

    updateCheck(check: boolean): void {
        this.withdrawalStore.update(state => ({
            ...state,
            infoWithdrawal: {
                ...state.infoWithdrawal,
                automatic_bank_account: check,
            },
        }));
    }
}
