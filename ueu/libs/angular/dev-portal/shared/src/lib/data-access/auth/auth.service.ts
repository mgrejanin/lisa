import { Injectable } from '@angular/core';
import { AuthQuery } from './auth.query';

// store components
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private store: AuthStore, private query: AuthQuery) {}

    /**
     *  Set store with User informations by Keycloak
     **/
    setUserData(data: AuthState): void {
        this.store.update(data);
    }
}
