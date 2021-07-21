import { StepperQuery } from './stepper.query';
import { StepperStore } from './stepper.store';

describe('StepperQuery', () => {
    let query: StepperQuery;

    beforeEach(() => {
        query = new StepperQuery(new StepperStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have isSelectingBank$ observable', () => {
        expect(query.isSelectingBank$).toBeDefined();
    });

    it('should have closed$ observable', () => {
        expect(query.closed$).toBeDefined();
    });

    it('should have next$ observable', () => {
        expect(query.next$).toBeDefined();
    });

    it('should have previous$ observable', () => {
        expect(query.previous$).toBeDefined();
    });

    it('should have isEdit$ observable', () => {
        expect(query.isEdit$).toBeDefined();
    });
});
