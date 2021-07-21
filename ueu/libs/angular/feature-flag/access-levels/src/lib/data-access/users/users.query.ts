import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

// store components
import { UsersState, UsersStore } from './users.store';

// interfaces
import { User } from '../../models';

// rxjs
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersQuery extends QueryEntity<UsersState, User> {
    readonly users$: Observable<User[]>;

    constructor(protected store: UsersStore) {
        super(store);

        this.users$ = this.selectAll();
    }
}
