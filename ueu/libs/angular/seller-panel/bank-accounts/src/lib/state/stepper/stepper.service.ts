import { Injectable } from '@angular/core';

import { StepperStore } from './stepper.store';

@Injectable({ providedIn: 'root' })
export class StepperService {
    constructor(private stepperStore: StepperStore) {}

    updateEditMode(isEdit: boolean): void {
        this.stepperStore.update({
            isEdit,
        });
    }

    updateSelectingBank(isSelectingBank: boolean): void {
        this.stepperStore.update({
            isSelectingBank,
        });
    }
}
