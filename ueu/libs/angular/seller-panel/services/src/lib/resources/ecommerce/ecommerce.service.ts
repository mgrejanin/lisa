import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { SellerAccessConfig } from '../../config';
import { PlanResponse, Tokens } from '../../models';

@Injectable()
export class EcommerceService {
    constructor(private http: HttpClient, protected config: CoreDataAccessService<SellerAccessConfig>) {}

    getTokens(): Observable<Tokens> {
        return this.http.get<Tokens>(`${this.config.getConfig().apiUrl}/ecommerce/tokens`);
    }

    generateTokens(): Observable<Tokens> {
        return this.http.post<Tokens>(`${this.config.getConfig().apiUrl}/ecommerce/tokens`, {});
    }

    getPlans(): Observable<PlanResponse[]> {
        return this.http.get<PlanResponse[]>(`${this.config.getConfig().apiUrl}/ecommerce/plans`);
    }

    setPlan(planID) {
        return this.http.patch(`${this.config.getConfig().apiUrl}/user/details`, {
            ecommerce: { plan_id: planID },
        });
    }
}
