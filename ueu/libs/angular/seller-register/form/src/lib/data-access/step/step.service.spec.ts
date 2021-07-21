import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { StepQuery } from './step.query';
import { StepService } from './step.service';
import { StepStore } from './step.store';

describe('StepService', () => {
    let stepService: StepService;
    let stepStore: StepStore;
    let stepQuery: StepQuery;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [StepService, StepStore],
            imports: [HttpClientTestingModule],
        });

        stepService = TestBed.inject(StepService);
        stepStore = TestBed.inject(StepStore);
        stepQuery = TestBed.inject(StepQuery);
    });

    it('should be created', () => {
        expect(stepService).toBeDefined();
    });

    it('should have updateStepState function', (done: jest.DoneCallback) => {
        const storeSpy = spyOn(stepStore, 'updateStepState');

        stepService.initStep({
            headerTitle: 'Title test',
            activateProgressbar: false,
            valueProgressBar: 0,
        });

        expect(storeSpy);
        stepQuery.stepState$.subscribe(() => done());
    });
});
