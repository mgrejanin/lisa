// @angular
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// data-access
import { AuthQuery, AuthService } from '../../data-access/auth';

// interfaces
import { AuthUserRoles } from '../../models';

@Injectable({
    providedIn: 'root',
})
export class AnyAdminGuard implements CanActivate, CanLoad {
    /*
        This guard is mostly used where any admin, global or of at least one squad,
        can have access to the route.
    */
    private readonly roles$: Observable<AuthUserRoles>;

    constructor(private authQuery: AuthQuery, private authService: AuthService) {
        this.roles$ = this.authQuery.roles$;
    }

    canActivate(): Observable<boolean> {
        return this.roles$.pipe(map(userRoles => this.authService.isAdmin(userRoles)));
    }

    canLoad(): Observable<boolean> {
        return this.roles$.pipe(map(userRoles => this.authService.isAdmin(userRoles)));
    }
}
