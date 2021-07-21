import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PicpayKeycloakCallback, PicpayKeycloakService } from '@picpay/keycloak';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../../models';

@Injectable()
export class KeycloakCallback implements PicpayKeycloakCallback {
    constructor(
        private keycloak: PicpayKeycloakService,
        private http: HttpClient,
        private config: CoreDataAccessService,
        private service: AuthService,
    ) {}

    callback(): Observable<unknown> {
        return forkJoin({
            token: this.keycloak.getToken(),
            user: this.keycloak.loadUserProfile<User>(),
            logged: this.keycloak.isLoggedIn(),
        }).pipe(
            switchMap(data => {
                this.service.setUserData(data);
                return this.http.post(`${this.config.getConfig().apiUrl}/internal/user/v1/users/create`, {});
            }),
        );
    }
}
