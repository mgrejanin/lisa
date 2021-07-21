import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

// interfaces
import { Role, User } from '../../models';

export interface SquadUsersState extends EntityState<User, string> {
    filter: string;
    roles: Role[];
    squadId: string;
}
const initialState = {
    filter: 'ALL',
    roles: [],
    activeSquadId: '',
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'squad-users', resettable: true })
export class SquadUsersStore extends EntityStore<SquadUsersState, User> {
    constructor() {
        super(initialState);
    }
}
