import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { SellerAccessConfig } from '../../config';

@Injectable({ providedIn: 'root' })
export class WithdrawalsService {
    constructor(private http: HttpClient, protected config: CoreDataAccessService<SellerAccessConfig>) {}

    autoWithdrawal(param: boolean) {
        const body = { auto_withdraw: param };

        return this.http.post(`${this.config.getConfig().apiUrl}/v2/withdrawals/change`, body);
    }
}
