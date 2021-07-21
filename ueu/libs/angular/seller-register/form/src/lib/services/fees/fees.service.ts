import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { DataFees, FeesResponse } from '../../models/fees-response.model';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { APIResponse } from '../../models/response.model';
import { SellerStore } from '../../data-access/seller/seller.store';

@Injectable({
    providedIn: 'root',
})
export class FeesService {
    private apiUrl = this.config.getConfig().apiUrl;

    constructor(private http: HttpClient, private config: CoreDataAccessService, private sellerStore: SellerStore) {}

    getFees(): Observable<FeesResponse> {
        return this.http
            .get<FeesResponse>(`${this.apiUrl}account/receipt-fees`)
            .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }

    postFees(data: DataFees): Observable<APIResponse> {
        this.sellerStore.setLoading(true);

        return this.http
            .post<APIResponse>(`${this.apiUrl}company/create/company-fees`, data)
            .pipe(finalize(() => this.sellerStore.setLoading(false)))
            .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }
}
