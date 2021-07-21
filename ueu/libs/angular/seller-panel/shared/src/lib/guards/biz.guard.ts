import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { SellerUser } from '@picpay/seller-panel/helpers';
import { SellerQuery } from '@picpay/seller-panel/services';

@Injectable({
    providedIn: 'root',
})
export class BizGuard implements CanActivate {
    constructor(private router: Router, private sellerQuery: SellerQuery) {}

    canActivate(): boolean | UrlTree {
        const sellerData = this.sellerQuery.getValue();
        const isTypeBiz = sellerData.organization.type === SellerUser.BIZ;

        return isTypeBiz ? isTypeBiz : this.router.parseUrl('inicio');
    }
}
