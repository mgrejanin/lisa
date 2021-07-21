import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { StepState } from '../../models/step.model';
import { StepStore } from './step.store';

@Injectable({ providedIn: 'root' })
export class StepQuery extends Query<StepState> {
    readonly stepState$: Observable<StepState>;

    constructor(protected store: StepStore) {
        super(store);

        this.stepState$ = this.select();
    }
}
