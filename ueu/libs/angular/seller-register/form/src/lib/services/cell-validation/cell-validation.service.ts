import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { SellerStore } from '../../data-access/seller/seller.store';
import { APIResponse } from '../../models/response.model';
import { UserPhone } from '../../models/user-phone.model';

@Injectable({
    providedIn: 'root',
})
export class CellValidationService {
    private apiUrl = `${this.config.getConfig().apiUrl}create/user-phone`;

    constructor(private http: HttpClient, private config: CoreDataAccessService, private sellerStore: SellerStore) {}

    postUserPhone(params: UserPhone): Observable<APIResponse> {
        this.sellerStore.setLoading(true);

        return this.http
            .post<APIResponse>(this.apiUrl, params)
            .pipe(finalize(() => this.sellerStore.setLoading(false)))
            .pipe(catchError((error: HttpErrorResponse) => throwError(error)));
    }
}
