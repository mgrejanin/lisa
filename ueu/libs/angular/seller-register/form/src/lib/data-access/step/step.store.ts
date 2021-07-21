import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';
import { Step, StepState } from '../../models/step.model';

export function createInitialState(): StepState {
    return new Step().toJSON();
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'step', resettable: true })
export class StepStore extends Store<StepState> {
    constructor() {
        super(createInitialState());
    }

    updateStepState(currentStep: StepState): void {
        this.update(() => new Step(currentStep).toJSON());
    }
}
