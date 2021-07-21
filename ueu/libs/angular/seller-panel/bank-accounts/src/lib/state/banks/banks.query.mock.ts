import { Bank } from '@picpay/seller-panel/bank-accounts';
import { Observable, of } from 'rxjs';

export class BanksQueryMock {
    selectedBank$: Observable<Bank>;
    banks$: Observable<Bank[]>;
    isLoading$: Observable<boolean>;
    loadedError$: Observable<boolean>;

    constructor() {
        this.selectedBank$ = of(null);
        this.banks$ = of([]);
        this.isLoading$ = of(false);
        this.loadedError$ = of(false);
    }
}
