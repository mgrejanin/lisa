// rxjs
import { Observable, of } from 'rxjs';

// interfaces
import { AuthUser, AuthUserRoles, FeatureFlagPermissions } from '../../../models';

// mocks
import { mockUser } from './auth-user.mock';

export class AuthServiceMock {
    constructor(private useRealPermissions?: boolean) {}

    getProfile(): Observable<AuthUser> {
        return of(mockUser);
    }

    logout(): void {}

    updateRedirectUrl(path: string): void {}

    hasPermissions(userRoles: AuthUserRoles, permissionRoles: FeatureFlagPermissions): boolean {
        if (this.useRealPermissions) {
            return (
                (permissionRoles.availableToAdmin && userRoles.isAdmin) ||
                (permissionRoles.availableToEditor && userRoles.isEditor) ||
                userRoles.adminSquad.some(id => permissionRoles.availableToSquadAdmin.includes(id)) ||
                userRoles.editorSquad.some(id => permissionRoles.availableToSquadEditor.includes(id))
            );
        }

        return true;
    }

    isAdmin(userRoles: AuthUserRoles): boolean {
        return true;
    }
}
