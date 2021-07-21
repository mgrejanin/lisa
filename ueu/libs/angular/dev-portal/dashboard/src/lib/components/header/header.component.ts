import { Component } from '@angular/core';
import { DevPortalDataAccessConfig } from '@picpay/dev-portal/data-access';
import { AuthQuery, User } from '@picpay/dev-portal/shared';
import { PicpayKeycloakProfile, PicpayKeycloakService } from '@picpay/keycloak';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { Observable } from 'rxjs';

@Component({
    selector: 'dev-portal-dashboard-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class DashboardHeaderComponent {
    user$: Observable<PicpayKeycloakProfile<User>>;

    constructor(
        private query: AuthQuery,
        private keycloak: PicpayKeycloakService,
        private config: CoreDataAccessService<DevPortalDataAccessConfig>,
    ) {
        this.user$ = this.query.user$;
    }

    async onLogout(): Promise<void> {
        if (this.query.getValue().logged) {
            await this.keycloak.logout(this.config.getConfig().studioUrl);
        }
    }
}
