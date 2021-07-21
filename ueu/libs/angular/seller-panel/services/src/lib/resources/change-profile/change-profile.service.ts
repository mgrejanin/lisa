import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { SellerAccessConfig } from '../../config';
import { SellerChangeProfileResponse, SellerChildrenProfile } from '../../models';

@Injectable({
    providedIn: 'root',
})
export class ChangeProfileService {
    constructor(private http: HttpClient, protected config: CoreDataAccessService<SellerAccessConfig>) {}

    getSellers(): Observable<SellerChildrenProfile[]> {
        return this.http.get<SellerChildrenProfile[]>(
            `${this.config.getConfig().apiUrl}/v2/user/original-login/seller/children`,
        );
    }

    changeSeller(sellerID: number): Observable<SellerChangeProfileResponse> {
        return this.http.post<SellerChangeProfileResponse>(`${this.config.getConfig().apiUrl}/user/login/change`, {
            seller_id: sellerID,
        });
    }
}
