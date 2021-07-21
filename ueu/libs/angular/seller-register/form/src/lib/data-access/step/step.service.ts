import { Injectable } from '@angular/core';
import { StepState } from '../../models/step.model';
import { StepStore } from './step.store';

@Injectable({ providedIn: 'root' })
export class StepService {
    constructor(private stepStore: StepStore) {}

    /**
     *
     * @param headerTitle string, default value: ''
     * @param activateProgressbar boolean, default value: true
     * @param valueProgressBar number, default value: 0
     *
     */
    initStep(step: StepState): void {
        this.stepStore.updateStepState(step);
    }
}
