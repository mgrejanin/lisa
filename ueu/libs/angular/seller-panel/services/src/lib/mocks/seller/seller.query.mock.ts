import { Observable, of } from 'rxjs';

import { Address, B2P, CurrentPlan, Ecommerce, Organization, Responsible, SellerOnboard, User } from '../../models';
import { SellerState } from '../../state/seller/seller.store';

export class SellerQueryMock {
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
    readonly onboard$: Observable<SellerOnboard>;
    readonly b2p$: Observable<B2P>;

    constructor() {
        this.organization$ = of({});
        this.responsible$ = of({});
        this.ecommerce$ = of({});
        this.plan$ = of({});
        this.address$ = of({});
        this.user$ = of();
        this.hasBranch$ = of(false);
        this.hasSellerAccount$ = of(false);
        this.biometry$ = of(false);
        this.completed$ = of(false);
        this.onboard$ = of({});
        this.b2p$ = of({});
    }

    getValue(): SellerState {
        return {};
    }
}

export class SellerQueryB2PMock {
    getValue() {
        return { b2p: { enabled: true } };
    }
}
