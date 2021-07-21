import { SellerAccessConfig } from './../../config/seller-access.config';
import { StoresResponse } from '../../models/transactions/stores-response.model';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class StoresService {
    constructor(private http: HttpClient, protected config: CoreDataAccessService<SellerAccessConfig>) {}

    getStores() {
        return this.http.get<StoresResponse[]>(`${this.config.getConfig().apiUrl}/v2/transactions/store-filters`).pipe(
            map(response =>
                response.map(store => ({
                    ...store,
                    checked: false,
                })),
            ),
        );
    }
}
