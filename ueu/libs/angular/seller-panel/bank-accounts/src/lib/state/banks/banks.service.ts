import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { transaction } from '@datorama/akita';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { SellerAccessConfig } from '@picpay/seller-panel/seller-access';
import { RequestResponse } from '@picpay/seller-panel/services';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { BanksStore } from './banks.store';
import { Bank } from '../../models';

@Injectable({ providedIn: 'root' })
export class BanksService {
    constructor(
        private banksStore: BanksStore,
        private http: HttpClient,
        protected config: CoreDataAccessService<SellerAccessConfig>,
    ) {}

    setSelectedBank(bank: Bank): void {
        this.banksStore.update({ selectedBank: bank });
    }

    clearSelectedBank(): void {
        this.banksStore.update({ selectedBank: {} });
    }

    getBankByQuery(query): Bank {
        return this.banksStore.getValue().banks.find(bank => bank.id === query);
    }

    clearBanksStore(): void {
        this.banksStore.reset();
    }

    @transaction()
    getBanks(search = ''): Observable<RequestResponse<Bank[]>> {
        const params = new HttpParams({}).set('search', search.trim()).set('preferred', '1');

        this.banksStore.update({ isLoading: true });

        return this.http
            .get<RequestResponse<Bank[]>>(`${this.config.getConfig().apiUrl}/v2/banks`, { params })
            .pipe(
                tap(response => {
                    this.banksStore.update({ banks: response?.data });
                    this.banksStore.update({ isLoading: false, loadedError: false });
                }),
                catchError(error => {
                    this.banksStore.setError(error.title);
                    this.banksStore.update({ isLoading: false, loadedError: true });
                    return throwError(error);
                }),
            );
    }
}
