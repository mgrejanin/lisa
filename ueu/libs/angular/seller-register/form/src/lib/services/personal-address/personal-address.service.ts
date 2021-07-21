import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { PersonalAddress } from '../../models/personal-address.model';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SellerStore } from '../../data-access/seller/seller.store';
import { APIResponse } from '../../models/response.model';

@Injectable({
    providedIn: 'root',
})
export class PersonalAddressService {
    private apiUrl = `${this.config.getConfig().apiUrl}create/user-address`;

    constructor(private http: HttpClient, private config: CoreDataAccessService, private sellerStore: SellerStore) {}

    postPersonalAddress(formData: PersonalAddress): Observable<APIResponse> {
        this.sellerStore.setLoading(true);

        return this.http
            .post<APIResponse>(this.apiUrl, formData)
            .pipe(finalize(() => this.sellerStore.setLoading(false)))
            .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }
}
