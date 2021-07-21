import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

// store components
import { AuthState, AuthStore } from './auth.store';

// rxjs
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

// interfaces
import { AuthUser, AuthUserRoles } from '../../models';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
    readonly roles$: Observable<AuthUserRoles>;
    readonly user$: Observable<AuthUser>;

    constructor(protected store: AuthStore) {
        super(store);

        this.roles$ = this.select('user').pipe(pluck('roles'));
        this.user$ = this.select('user');
    }
}
