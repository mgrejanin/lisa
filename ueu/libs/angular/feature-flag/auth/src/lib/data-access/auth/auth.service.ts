// angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// @picpay
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

// store components
import { AuthStore } from './auth.store';

// rxjs
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// interfaces
import { AuthUser, AuthUserRoles, FeatureFlagPermissions } from '../../models';

// keycloack
import { PicpayKeycloakService } from '@picpay/keycloak';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private store: AuthStore,
        private http: HttpClient,
        private config: CoreDataAccessService,
        private keycloakService: PicpayKeycloakService,
    ) {}

    getProfile(): Observable<AuthUser> {
        const url = `${this.config.getConfig().apiUrl}/flags/users/me`;

        return this.http.get<AuthUser>(url).pipe(
            tap(user => {
                this.store.update({ user });
            }),
        );
    }

    /**
     * this method will remove everything
     * from the store and redirect the user
     * to the login page
     *
     * @memberof AuthService
     */
    async logout(): Promise<void> {
        this.store.reset();
        await this.keycloakService.logout();
    }

    /* utils */
    updateRedirectUrl(path: string): void {
        this.store.updateRedirectUrl(path);
    }

    /**
     * Checks if the user satisfies one of the route needed permissions.
     *
     * @param {AuthUserRoles} userRoles
     * @param {FeatureFlagPermissions} permissionRoles
     * @return {*}  {boolean}
     * @memberof AuthService
     */
    hasPermissions(userRoles: AuthUserRoles, permissionRoles: FeatureFlagPermissions): boolean {
        return (
            (permissionRoles?.availableToAdmin && userRoles?.isAdmin) ||
            (permissionRoles?.availableToEditor && userRoles?.isEditor) ||
            (permissionRoles?.isAvailableToSquadAdmin && this.isSquadAdmin(userRoles)) ||
            (permissionRoles?.isAvailableToSquadEditor && this.isSquadEditor(userRoles)) ||
            userRoles?.adminSquad.some(id => permissionRoles?.availableToSquadAdmin.includes(id)) ||
            userRoles?.editorSquad.some(id => permissionRoles?.availableToSquadEditor.includes(id)) ||
            false
        );
    }

    /**
     * checks if the user is a global or squad admin
     *
     * @param {AuthUserRoles} userRoles
     * @return {*}  {boolean}
     * @memberof AuthService
     */
    isAdmin(userRoles: AuthUserRoles): boolean {
        return userRoles?.isAdmin || this.isSquadAdmin(userRoles);
    }

    /**
     * checks if the user is squad admin
     *
     * @param {AuthUserRoles} userRoles
     * @return {*}  {boolean}
     * @memberof AuthService
     */
    isSquadAdmin(userRoles: AuthUserRoles): boolean {
        return userRoles?.adminSquad.length > 0;
    }

    /**
     * checks if the user is a global or squad editor
     *
     * @param {AuthUserRoles} userRoles
     * @return {*}  {boolean}
     * @memberof AuthService
     */
    isEditor(userRoles: AuthUserRoles): boolean {
        return userRoles?.isEditor || this.isSquadEditor(userRoles);
    }

    /**
     * checks if the user is squad editor
     *
     * @param {AuthUserRoles} userRoles
     * @return {*}  {boolean}
     * @memberof AuthService
     */
    isSquadEditor(userRoles: AuthUserRoles): boolean {
        return userRoles?.editorSquad.length > 0;
    }
}
