import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { AuthUser } from '../../models';

export interface AuthState {
    user: AuthUser;
    redirectUrl: string;
}

export function createInitialState(): AuthState {
    return {
        user: null,
        redirectUrl: '',
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth', resettable: true })
export class AuthStore extends Store<AuthState> {
    constructor() {
        super(createInitialState());
    }

    updateRedirectUrl(path: string): void {
        this.update({ redirectUrl: path });
    }
}
