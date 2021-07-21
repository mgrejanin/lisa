import { Observable, of } from 'rxjs';

import { SellerResponse } from '../../models';
import { SellerState } from '../../state/seller/seller.store';

export class SellerServiceMock {
    setSellerData(data: SellerState): void {}

    getOrganizationDocument(): string {
        return '00.000.000/0001-03';
    }

    clearSellerData(): void {}

    refreshSellerData(): void {}

    editDetails(details: SellerResponse = {}): Observable<SellerResponse> {
        return of({});
    }

    finishOnboard() {
        return of({
            current_step: 0,
            finished_at: {
                date: '2021-01-19 18:33:16.564196',
                timezone_type: 3,
                timezone: 'America/Sao_Paulo',
            },
        });
    }
}
