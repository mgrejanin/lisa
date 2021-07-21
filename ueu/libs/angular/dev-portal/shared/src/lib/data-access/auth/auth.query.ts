import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { PicpayKeycloakProfile } from '@picpay/keycloak';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { AuthState, AuthStore } from './auth.store';
@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
    readonly token$: Observable<string>;
    readonly user$: Observable<PicpayKeycloakProfile<User>>;
    readonly logged$: Observable<boolean>;

    constructor(protected store: AuthStore) {
        super(store);
        this.token$ = this.select('token');
        this.user$ = this.select('user');
        this.logged$ = this.select('logged');
    }
}
