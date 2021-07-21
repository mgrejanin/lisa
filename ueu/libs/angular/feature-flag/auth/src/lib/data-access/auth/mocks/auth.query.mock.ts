// rxjs
import { Observable, of } from 'rxjs';

// interfaces
import { AuthUser, AuthUserRoles } from '../../../models';

// mocks
import { mockUser } from './auth-user.mock';
export class AuthQueryMock {
    readonly roles$: Observable<AuthUserRoles>;
    readonly user$: Observable<AuthUser>;

    constructor(private isAuthenticatedValue: boolean) {
        this.roles$ = of(mockUser.roles);
        this.user$ = of(null);
    }
}
