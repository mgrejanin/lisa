import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Squad } from '../../models';

export interface AccessLevelsState extends EntityState<Squad, string> {
    filter: string;
}
const initialState = {
    filter: 'ALL',
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'access-levels' })
export class SquadsStore extends EntityStore<AccessLevelsState, Squad> {
    constructor() {
        super(initialState);
    }
}
