import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
// interfaces
import { User } from '../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UsersState extends EntityState<User, string> {}

const initialState = {};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users-base' })
export class UsersStore extends EntityStore<UsersState, User> {
    constructor() {
        super(initialState);
    }
}
