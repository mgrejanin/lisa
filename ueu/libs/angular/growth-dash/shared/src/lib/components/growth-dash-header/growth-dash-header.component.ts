import { Component } from '@angular/core';
import { PicpayKeycloakService } from '@picpay/keycloak';

@Component({
    selector: 'growth-dash-header',
    templateUrl: './growth-dash-header.component.html',
    styleUrls: ['./growth-dash-header.component.scss'],
})
export class GrowthDashHeaderComponent {
    constructor(private keycloakService: PicpayKeycloakService) {}

    async onLogout(): Promise<void> {
        await this.keycloakService.logout();
    }
}
