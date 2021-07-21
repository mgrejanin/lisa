import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';

import { SellerPanelAuthService } from '../auth.service';

@Injectable()
export class SellerPanelAuthGuard implements CanLoad {
    constructor(private authService: SellerPanelAuthService) {}

    canLoad(): boolean {
        if (this.authService.isLogged()) {
            return true;
        }

        this.authService.logout();

        return false;
    }
}
