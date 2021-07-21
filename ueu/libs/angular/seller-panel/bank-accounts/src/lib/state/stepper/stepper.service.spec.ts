import { TestBed } from '@angular/core/testing';

import { StepperService } from './stepper.service';
import { StepperStore } from './stepper.store';

describe('StepperService', () => {
    let stepperService: StepperService;
    let stepperStore: StepperStore;

    beforeEach(() => {
        stepperService = TestBed.inject(StepperService);
        stepperStore = TestBed.inject(StepperStore);
    });

    it('should be created', () => {
        expect(stepperService).toBeDefined();
    });

    it('should have updateEditMode function', () => {
        const storeSpy = spyOn(stepperStore, 'update');

        stepperService.updateEditMode(false);

        expect(storeSpy).toHaveBeenCalledWith({ isEdit: false });
    });

    it('should have updateSelectingBank function', () => {
        const storeSpy = spyOn(stepperStore, 'update');

        stepperService.updateSelectingBank(true);

        expect(storeSpy).toHaveBeenCalledWith({ isSelectingBank: true });
    });
});
