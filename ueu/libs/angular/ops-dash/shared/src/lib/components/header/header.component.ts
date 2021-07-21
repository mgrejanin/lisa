import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { PicpayKeycloakService } from '@picpay/keycloak';
import { Router } from '@angular/router';

@Component({
    selector: 'ops-dash-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    user: Observable<Keycloak.KeycloakProfile>;

    constructor(private keycloakService: PicpayKeycloakService, private router: Router) {
        this.user = this.keycloakService.loadUserProfile();
    }

    async logout() {
        await this.keycloakService.logout();
    }

    locationHelpPage(): void {
        this.router.navigateByUrl('/help');
    }

    downloadCertificate(): void {
        window.open('https://drive.google.com/file/d/137wgW17l3buAkLHkEX4xo5YrH9k42yEd/view?usp=sharing', '_blank');
    }
}
