import { StepQuery } from './step.query';
import { StepStore } from './step.store';

describe('StepQuery', () => {
    let query: StepQuery;

    beforeEach(() => {
        query = new StepQuery(new StepStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have stepState$ observable', () => {
        expect(query.stepState$).toBeDefined();
    });
});
