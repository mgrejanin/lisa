import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface StepperState {
    isSelectingBank: boolean;
    closed: boolean;
    next: boolean;
    previous: boolean;
    isEdit: boolean;
}

function createInitialState(): StepperState {
    return {
        isSelectingBank: false,
        closed: true,
        next: false,
        previous: false,
        isEdit: false,
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'stepper' })
export class StepperStore extends Store<StepperState> {
    constructor() {
        super(createInitialState());
    }
}
