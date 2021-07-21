import { Injectable } from '@angular/core';
import { Router, UrlTree, CanLoad } from '@angular/router';
import { SellerService } from '@picpay/seller-panel/services';

import { SellerPanelAuthService } from '../auth.service';

@Injectable()
export class SellerPanelSessionGuard implements CanLoad {
    constructor(
        private authService: SellerPanelAuthService,
        private router: Router,
        private sellerService: SellerService,
    ) {}

    canLoad(): boolean | UrlTree {
        if (this.authService.isLogged()) {
            return this.router.parseUrl('/inicio');
        }

        localStorage.clear();
        this.sellerService.clearSellerData();

        return true;
    }
}
