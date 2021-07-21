import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { removeUndefinedNull, Unsubscriber } from '@picpay/angular/shared/helpers';

import { RequestResponse, SellerOnboard, SellerResponse } from '../../models';
import { SellerAccessConfig } from '../../config/seller-access.config';
import { SellerState, SellerStore } from './seller.store';

@Injectable({ providedIn: 'root' })
export class SellerService {
    @Unsubscriber() readonly unsubscriber$: Subject<void>;

    constructor(
        private http: HttpClient,
        protected config: CoreDataAccessService<SellerAccessConfig>,
        private sellerStore: SellerStore,
    ) {}

    setSellerData(data: SellerState): void {
        this.sellerStore.update(data);
    }

    getOrganizationDocument(): string {
        return this.sellerStore.getValue().organization.cpfCnpj;
    }

    clearSellerData(): void {
        this.sellerStore.reset();
    }

    refreshSellerData(): void {
        this.unsubscriber$.next();

        this.http
            .get<SellerResponse>(`${this.config.getConfig().apiUrl}/user/details`)
            .pipe(
                takeUntil(this.unsubscriber$),
                finalize(() => this.unsubscriber$.next()),
            )
            .subscribe((response: SellerResponse) => {
                this.setSellerData(response);
            });
    }

    editDetails(details: SellerResponse = {}): Observable<SellerResponse> {
        const detailsPayload: SellerResponse = removeUndefinedNull(details);
        this.sellerStore.setLoading(true);

        return this.http
            .patch<SellerResponse>(`${this.config.getConfig().apiUrl}/user/details`, detailsPayload)
            .pipe(finalize(() => this.sellerStore.setLoading(false)));
    }

    finishOnboard() {
        return this.http
            .post<RequestResponse<SellerOnboard>>(`${this.config.getConfig().apiUrl}/onboard/finish`, {})
            .pipe(
                tap(response => {
                    this.sellerStore.update({
                        onboard: response.data,
                    });
                }),
            );
    }
}
