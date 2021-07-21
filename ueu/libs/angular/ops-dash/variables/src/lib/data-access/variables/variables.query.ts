import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';

import { VariablesState, VariablesStore } from './variables.store';

import { Service } from '../../models/services.model';
import { Variable } from '../../models/variable.model';

@Injectable({ providedIn: 'root' })
export class VariablesQuery extends QueryEntity<VariablesState> {
    environment$: Observable<string>;
    associatedServices$: Observable<Service[]>;
    variables$: Observable<(Variable | Service)[]>;
    totalItems$: Observable<number>;

    isLoadingListVariables$: Observable<boolean>;
    isLoadingUpdateVariable$: Observable<boolean>;
    isLoadingService$: Observable<boolean>;
    isLoadingValueVariableSecret$: Observable<boolean>;
    isLoadingButtonDeploy$: Observable<boolean>;

    showValueVariableSecret$: Observable<boolean>;
    disabledSection$: Observable<boolean>;

    pageIndex$: Observable<number>;
    activeVariableKey$: Observable<string>;
    valueVariableSecret$: Observable<string>;
    valueVariable$: Observable<string>;
    typeVariable$: Observable<string>;

    constructor(protected store: VariablesStore) {
        super(store);

        this.environment$ = this.select('environment');
        this.associatedServices$ = this.select('associatedServices');
        this.variables$ = this.selectAll();
        this.totalItems$ = this.select('totalItems');

        this.isLoadingListVariables$ = this.select('isLoadingListVariables');
        this.isLoadingUpdateVariable$ = this.select('isLoadingUpdateVariable');
        this.isLoadingService$ = this.select('isLoadingService');
        this.isLoadingValueVariableSecret$ = this.select('isLoadingValueVariableSecret');
        this.isLoadingButtonDeploy$ = this.select('isLoadingButtonDeploy');

        this.showValueVariableSecret$ = this.select('showValueVariableSecret');
        this.disabledSection$ = this.select('disabledSection');

        this.pageIndex$ = this.select('pageIndex');
        this.activeVariableKey$ = this.selectActiveId();
        this.valueVariableSecret$ = this.select('valueVariableSecret');
        this.valueVariable$ = this.select('valueVariable');
        this.typeVariable$ = this.select('typeVariable');
    }
}
