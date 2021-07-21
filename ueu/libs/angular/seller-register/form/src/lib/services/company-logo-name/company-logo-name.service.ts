import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SellerStore } from '../../data-access/seller/seller.store';
import { CompanyLogoName } from '../../models/company-logo-name.model';
import { APIResponse } from '../../models/response.model';

@Injectable({
    providedIn: 'root',
})
export class CompanyLogoNameService {
    private apiUrl = `${this.config.getConfig().apiUrl}company/create/company-config`;

    constructor(private http: HttpClient, private config: CoreDataAccessService, private sellerStore: SellerStore) {}

    postCompanyLogoName(data: CompanyLogoName): Observable<APIResponse> {
        this.sellerStore.setLoading(true);

        const formData = new FormData();

        if (data?.company_logo) {
            formData.append('company_logo', data?.company_logo, data?.company_logo?.name);
        }

        formData.append('company_display', data?.company_display);

        return this.http
            .post<APIResponse>(this.apiUrl, formData)
            .pipe(finalize(() => this.sellerStore.setLoading(false)))
            .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }
}
