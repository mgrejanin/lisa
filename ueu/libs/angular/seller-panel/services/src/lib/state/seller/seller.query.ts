import { Injectable } from '@angular/core';
import { StoreSeller } from './../../models/seller/store.model';

import { Observable } from 'rxjs';

import { Query } from '@datorama/akita';

import { SellerState, SellerStore } from './seller.store';

import { PicpayIfRolesServiceModel } from '@picpay/angular/shared/directives';
import { Address, B2P, CurrentPlan, Ecommerce, Organization, SellerOnboard, User } from '../../models';
import { Responsible } from '../../models/seller/responsible.model';

@Injectable({ providedIn: 'root' })
export class SellerQuery extends Query<SellerState> implements PicpayIfRolesServiceModel {
    readonly organization$: Observable<Organization>;
    readonly responsible$: Observable<Responsible>;
    readonly ecommerce$: Observable<Ecommerce>;
    readonly plan$: Observable<CurrentPlan>;
    readonly address$: Observable<Address>;
    readonly user$: Observable<User>;
    readonly hasBranch$: Observable<boolean>;
    readonly hasSellerAccount$: Observable<boolean>;
    readonly biometry$: Observable<boolean>;
    readonly completed$: Observable<boolean>;
    readonly hasStore$: Observable<StoreSeller>;
    readonly onboard$: Observable<SellerOnboard>;
    readonly b2p$: Observable<B2P>;
    readonly isLoading$: Observable<boolean>;

    constructor(protected store: SellerStore) {
        super(store);

        this.organization$ = this.select('organization');
        this.responsible$ = this.select('responsible');
        this.ecommerce$ = this.select('ecommerce');
        this.plan$ = this.select('plan');
        this.address$ = this.select('address');
        this.user$ = this.select('user');
        this.hasBranch$ = this.select('hasBranch');
        this.hasSellerAccount$ = this.select('hasSellerAccount');
        this.biometry$ = this.select('biometry');
        this.completed$ = this.select('completed');
        this.hasStore$ = this.select('store');
        this.onboard$ = this.select('onboard');
        this.b2p$ = this.select('b2p');
        this.isLoading$ = this.selectLoading();
    }

    getUserRoles(): string[] | null {
        return this.getValue().organization.type
            ? this.getValue().b2p?.enabled
                ? [this.getValue().organization.type, 'b2p']
                : [this.getValue().organization.type]
            : null;
    }
}
