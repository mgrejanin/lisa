import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@picpay/feature-flag/auth';

@Component({
    selector: 'feature-flag-features-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
    @Input() showReturnBtn: boolean;

    constructor(private auth: AuthService, private router: Router) {}

    async onReturn(): Promise<void> {
        await this.router.navigate(['../']);
    }

    async onLogout(): Promise<void> {
        await this.auth.logout();
    }
}
