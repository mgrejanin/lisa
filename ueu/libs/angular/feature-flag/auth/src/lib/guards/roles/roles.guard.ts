import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// data access
import { AuthQuery, AuthService } from '../../data-access';

// interfaces
import { AuthUserRoles, createFeatureFlagPermissions, FeatureFlagPermissions } from '../../models';
/**
 *
 * This guard is used as a generic role guard. You have to set an
 * role (Permissions interface) object on the data of the route using it. If the user
 * has any of the route permitted roles, it will be allowed to
 * see the content.
 *
 * If the role object is not added to route data, no one will be allowed to
 * go through as a safety measure.
 *
 * @export
 * @class RolesGuard
 * @implements {CanActivate}
 */
@Injectable({
    providedIn: 'root',
})
export class RolesGuard implements CanActivate {
    private readonly roles$: Observable<AuthUserRoles>;

    constructor(private router: Router, private authQuery: AuthQuery, private authService: AuthService) {
        this.roles$ = this.authQuery.roles$;
    }

    canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
        const squadId = next.params?.squadId as string;
        const roles = next.data?.roles as FeatureFlagPermissions;

        let isValid = false;
        this.hasRoutePermission(roles, squadId).subscribe(value => (isValid = value));
        if (!isValid) {
            this.router.navigate(['/401']);
            return of(false);
        } else {
            return of(true);
        }
    }

    private hasRoutePermission(roles: FeatureFlagPermissions, squadId: string): Observable<boolean> {
        if (!roles) {
            return of(false);
        }

        const routePermittedRoles = createFeatureFlagPermissions({
            ...roles,
        });

        if (squadId) {
            roles.isAvailableToSquadAdmin && routePermittedRoles.availableToSquadAdmin.push(squadId);
            roles.isAvailableToSquadEditor && routePermittedRoles.availableToSquadEditor.push(squadId);
        }

        return this.roles$.pipe(map(userRoles => this.authService.hasPermissions(userRoles, routePermittedRoles)));
    }
}
