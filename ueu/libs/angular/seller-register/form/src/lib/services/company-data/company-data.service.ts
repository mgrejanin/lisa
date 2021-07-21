import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { CompanyData } from '../../models/company-data.model';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SellerStore } from '../../data-access/seller/seller.store';
import { APIResponse } from '../../models/response.model';

@Injectable({
    providedIn: 'root',
})
export class CompanyDataService {
    private apiUrl = `${this.config.getConfig().apiUrl}create/company-data`;

    constructor(private http: HttpClient, private config: CoreDataAccessService, private sellerStore: SellerStore) {}

    postCompanyData(formData: CompanyData): Observable<APIResponse> {
        this.sellerStore.setLoading(true);

        return this.http
            .post<APIResponse>(this.apiUrl, formData)
            .pipe(finalize(() => this.sellerStore.setLoading(false)))
            .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }
}
