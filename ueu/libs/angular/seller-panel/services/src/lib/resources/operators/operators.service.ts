import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { SellerAccessConfig } from '../../config';
import { OperatorsResponse } from '../../models';

@Injectable()
export class OperatorsService {
    constructor(private http: HttpClient, protected config: CoreDataAccessService<SellerAccessConfig>) {}

    getOperators(tokenBiz: string) {
        const params = new HttpParams().set('token_biz', tokenBiz);

        return this.http
            .get<OperatorsResponse>(`${this.config.getConfig().apiUrl}/user/operator`, {
                params,
            })
            .pipe(
                map(response =>
                    response.data.list.map(operator => ({
                        ...operator,
                        checked: false,
                    })),
                ),
            );
    }
}
