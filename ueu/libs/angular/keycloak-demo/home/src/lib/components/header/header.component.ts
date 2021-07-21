import { Component } from '@angular/core';
import { PicpayKeycloakService } from '@picpay/keycloak';

@Component({
    selector: 'keycloak-demo-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    constructor(private keycloakService: PicpayKeycloakService) {}

    async doLogout(): Promise<void> {
        await this.keycloakService.logout();
    }
}
