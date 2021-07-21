import { Injectable } from '@angular/core';

// akita
import { QueryEntity } from '@datorama/akita';

// interfaces
import { RolesUser, User } from '../../models';

// rxjs
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// interfaces
import { SquadUsersState, SquadUsersStore } from './squad-users.store';

@Injectable({ providedIn: 'root' })
export class SquadUsersQuery extends QueryEntity<SquadUsersState, User> {
    readonly filter$: Observable<string>;
    readonly roles$: Observable<RolesUser[]>;
    readonly activeSquadId$: Observable<string>;
    readonly filteredUser$: Observable<User[]>;

    constructor(protected store: SquadUsersStore) {
        super(store);

        this.filter$ = this.select('filter');

        this.roles$ = this.select('roles');

        this.activeSquadId$ = this.select('activeSquadId');

        /* istanbul ignore next */
        this.filteredUser$ = this.filter$.pipe(
            switchMap(filter =>
                this.selectAll({
                    filterBy: entity =>
                        filter === 'ALL' ? true : entity.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1,
                }),
            ),
        );
    }
}
