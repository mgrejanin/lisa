import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { InfoWithDrawal } from '../../models/auto-withdrawal.model';

export interface AutoWithdrawalState {
    infoWithdrawal: InfoWithDrawal;
    isLoading: boolean;
    isError: boolean;
}

function createInitialState(): AutoWithdrawalState {
    return {
        infoWithdrawal: null,
        isLoading: false,
        isError: false,
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'AutoWithdrawal' })
export class AutoWithdrawalStore extends Store<AutoWithdrawalState> {
    constructor() {
        super(createInitialState());
    }
}
