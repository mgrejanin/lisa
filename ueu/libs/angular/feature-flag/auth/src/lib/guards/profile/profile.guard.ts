import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

// rxjs
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

// models
import { AuthUser } from '../../models';

// data-access
import { AuthQuery, AuthService } from '../../data-access';

@Injectable({ providedIn: 'root' })
export class ProfileGuard implements CanActivate, CanLoad {
    private readonly user$: Observable<AuthUser>;

    constructor(private authQuery: AuthQuery, private authService: AuthService) {
        this.user$ = this.authQuery.user$;
    }

    private getUserProfile(): Observable<boolean> {
        return this.user$.pipe(
            switchMap(user => {
                if (user) {
                    return of(true);
                }
                return this.authService.getProfile().pipe(map(user => !!user));
            }),
            take(1),
        );
    }

    canActivate(): Observable<boolean> {
        return this.getUserProfile();
    }

    canLoad(): Observable<boolean> {
        return this.getUserProfile();
    }
}
