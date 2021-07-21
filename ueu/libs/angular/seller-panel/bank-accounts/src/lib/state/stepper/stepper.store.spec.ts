import { StepperStore } from './stepper.store';

describe('StepperStore', () => {
    let store: StepperStore;

    beforeEach(() => {
        store = new StepperStore();
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should have initialState store', () => {
        expect(store.getValue().isSelectingBank).toBe(false);

        expect(store.getValue().closed).toBe(true);

        expect(store.getValue().next).toBe(false);

        expect(store.getValue().previous).toBe(false);

        expect(store.getValue().isEdit).toBe(false);
    });
});
