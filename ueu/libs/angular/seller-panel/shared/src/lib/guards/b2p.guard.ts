import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { SellerQuery } from '@picpay/seller-panel/services';

@Injectable({
    providedIn: 'root',
})
export class B2PGuard implements CanActivate {
    constructor(private router: Router, private sellerQuery: SellerQuery) {}

    canActivate(): boolean | UrlTree {
        const isTypeB2P = this.sellerQuery.getValue().b2p?.enabled;

        return isTypeB2P ? true : this.router.parseUrl('/inicio');
    }
}
