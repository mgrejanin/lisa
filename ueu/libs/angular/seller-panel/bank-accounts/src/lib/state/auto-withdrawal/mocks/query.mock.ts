import { InfoWithDrawal } from '../../../models/auto-withdrawal.model';

import { Observable, of } from 'rxjs';

export class AutoWithdrawalQueryMock {
    readonly infoWithdrawal$: Observable<InfoWithDrawal>;
    readonly isCheck$: Observable<boolean>;
    readonly price$: Observable<number>;
    readonly isLoading$: Observable<boolean>;
    readonly isError$: Observable<boolean>;
    constructor() {
        this.infoWithdrawal$ = of();
        this.isCheck$ = of(true);
        this.price$ = of(1000);
        this.isLoading$ = of(false);
        this.isError$ = of(false);
    }
}
