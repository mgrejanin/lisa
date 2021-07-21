import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerAccessConfig } from '../../config/seller-access.config';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { BatchShipment } from '../../models';

@Injectable({
    providedIn: 'root',
})
export class ShipmentService {
    constructor(private http: HttpClient, protected config: CoreDataAccessService<SellerAccessConfig>) {}

    saveBatchShipment(batch: BatchShipment) {
        const formData = new FormData();
        formData.append('name', batch.name);
        formData.append('file', batch.file);
        formData.append('end_date', batch.end_date.toISOString().split('T')[0]);
        formData.append('withdrawable', batch.withdrawable ? '1' : '0');

        return this.http.post(`${this.config.getConfig().apiUrl}/b2p/batch`, formData);
    }
}
