import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

import { ChargeTransaction } from '../../models/charge/charge.model';
import { SellerAccessConfig } from '../../config';

@Injectable()
export class ChargeService {
    constructor(
        private http: HttpClient,
        protected config: CoreDataAccessService<SellerAccessConfig>,
        private notificationService: NotificationsService,
    ) {}

    getChargeTransaction(payload: {
        value: number;
        fixed_value: boolean;
        token_biz: string;
    }): Observable<ChargeTransaction> {
        return this.http.post<ChargeTransaction>(`${this.config.getConfig().apiUrl}/transactions/ppcode`, payload);
    }

    downloadQrCode(token_biz: string): Observable<ArrayBuffer> {
        return this.http
            .post(
                `${this.config.getConfig().apiUrl}/user/download-ppcode`,
                { token_biz },
                { responseType: 'arraybuffer' },
            )
            .pipe(
                tap(() => {
                    this.notificationService.openSnackbar(
                        'Download do QR code realizado com sucesso.',
                        SnackbarTypes.DONE,
                    );
                }),
            );
    }
}
