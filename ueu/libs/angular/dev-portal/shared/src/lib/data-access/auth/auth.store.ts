import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { PicpayKeycloakProfile } from '@picpay/keycloak';
import { User } from '../../models';

export interface AuthState {
    token: string;
    user: PicpayKeycloakProfile<User>;
    logged: boolean;
}

export function createInitialState(): AuthState {
    return {
        token: '',
        user: {},
        logged: false,
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
    constructor() {
        super(createInitialState());
    }
}
