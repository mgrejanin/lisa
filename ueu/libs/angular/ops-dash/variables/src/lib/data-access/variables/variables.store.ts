import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Service } from '../../models/services.model';
import { Variable } from '../../models/variable.model';

export interface VariablesState extends EntityState<Variable | Service, string> {
    environment: string;
    associatedServices: Service[];
    totalItems: number;

    isLoadingListVariables: boolean;
    isLoadingUpdateVariable: boolean;
    isLoadingService: boolean;
    isLoadingValueVariableSecret: boolean;
    isLoadingButtonDeploy: boolean;

    showValueVariableSecret: boolean;
    disabledSection: boolean;
    pageIndex: number;
    valueVariableSecret: string;
    valueVariable: string;
    typeVariable: string;
}

export function createInitialState(): VariablesState {
    return {
        environment: 'qa',
        associatedServices: [],
        totalItems: 0,

        isLoadingListVariables: false,
        isLoadingUpdateVariable: false,
        isLoadingService: false,
        isLoadingValueVariableSecret: false,
        isLoadingButtonDeploy: false,

        showValueVariableSecret: true,
        disabledSection: false,
        pageIndex: 0,
        valueVariableSecret: '',
        valueVariable: '',
        typeVariable: '',
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'variables', idKey: 'key' })
export class VariablesStore extends EntityStore<VariablesState, Variable | Service> {
    constructor() {
        super(createInitialState());
    }
}
