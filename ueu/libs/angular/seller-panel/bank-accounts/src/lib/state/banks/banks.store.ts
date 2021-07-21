import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { Bank } from '../../models';

export interface BanksState {
    isLoading: boolean;
    loadedError: boolean;
    selectedBank: Bank;
    banks: Bank[];
}

function createInitialState(): BanksState {
    return {
        isLoading: false,
        loadedError: false,
        selectedBank: {},
        banks: [],
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'banks', resettable: true })
export class BanksStore extends Store<BanksState> {
    constructor() {
        super(createInitialState());
    }

    updateSelectedBank(bank: Bank): void {
        this.update({ selectedBank: bank });
    }
}
