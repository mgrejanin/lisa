import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PicpayKeycloakService } from '@picpay/keycloak';
import { menu } from '../../app.layout.config';
import { PicpayKeycloakProfile } from '@picpay/keycloak';

@Component({
    selector: 'keycloak-demo-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    user: PicpayKeycloakProfile;
    userRoles: string[];
    isShowingMenu = false;

    constructor(private keycloakService: PicpayKeycloakService, private router: Router) {}

    ngOnInit(): void {
        this.user = this.keycloakService.getUserProfile();
        this.userRoles = this.keycloakService.getUserRoles();
    }

    showMenuItem(): void {
        const adminMenu = menu[1];
        if (adminMenu.roles[0] === 'admin') {
            adminMenu.roles = [this.userRoles[0]];
            this.isShowingMenu = true;
            return;
        }

        this.isShowingMenu = false;
        adminMenu.roles = ['admin'];
    }

    async navigate(): Promise<void> {
        await this.router.navigate(['/secret']);
    }
}
