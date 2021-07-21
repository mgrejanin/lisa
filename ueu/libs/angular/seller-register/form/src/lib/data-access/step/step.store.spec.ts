import { Step } from '../../models/step.model';
import { StepStore } from './step.store';

describe('StepStore', () => {
    let store: StepStore;

    beforeEach(() => {
        store = new StepStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should have updateStepState function', () => {
        const updateSpy = spyOn(store, 'updateStepState');

        const mockTitle = new Step({
            headerTitle: 'Title Test',
        });

        store.updateStepState(mockTitle);
        expect(updateSpy).toHaveBeenCalledWith(mockTitle);
    });
});
