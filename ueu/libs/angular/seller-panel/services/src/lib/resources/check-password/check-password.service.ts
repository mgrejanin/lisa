import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { Observable } from 'rxjs';

import { SellerAccessConfig } from '../../config';

@Injectable()
export class CheckPasswordService {
    constructor(private http: HttpClient, protected config: CoreDataAccessService<SellerAccessConfig>) {}

    verifyPassword(body: { password: string }): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.config.getConfig().apiUrl}/user/verifyPassword`, body);
    }
}
