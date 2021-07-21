import { Observable, of } from 'rxjs';
import { RechargeUpdate } from '../../../models';

export class RechargesServiceMock {
    getRecharges(): void {
        // Mock Method
    }
    updateRechargeValue(): Observable<RechargeUpdate> {
        return of({
            data: {},
        });
    }
}
