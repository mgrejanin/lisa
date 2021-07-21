import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Query } from '@datorama/akita';

import { StepperState, StepperStore } from './stepper.store';

@Injectable({ providedIn: 'root' })
export class StepperQuery extends Query<StepperState> {
    isSelectingBank$: Observable<boolean>;
    closed$: Observable<boolean>;
    next$: Observable<boolean>;
    previous$: Observable<boolean>;
    isEdit$: Observable<boolean>;

    constructor(protected store: StepperStore) {
        super(store);

        this.isSelectingBank$ = this.select('isSelectingBank');
        this.closed$ = this.select('closed');
        this.next$ = this.select('next');
        this.previous$ = this.select('previous');
        this.isEdit$ = this.select('isEdit');
    }
}
