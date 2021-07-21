import { Injectable } from '@angular/core';
import { StoreSeller } from './../../models/seller/store.model';

import { Store, StoreConfig } from '@datorama/akita';

import { Address, B2P, CurrentPlan, Ecommerce, Organization, Responsible, SellerOnboard, User } from '../../models';

export interface SellerState {
    organization?: Organization;
    responsible?: Responsible;
    ecommerce?: Ecommerce;
    plan?: CurrentPlan;
    user?: User;
    address?: Address;
    hasBranch?: boolean;
    hasSellerAccount?: boolean;
    biometry?: boolean;
    completed?: boolean;
    store?: StoreSeller;
    onboard?: SellerOnboard;
    b2p?: B2P;
}

function createInitialState(): SellerState {
    return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'seller', resettable: true })
export class SellerStore extends Store<SellerState> {
    constructor() {
        super(createInitialState());
    }
}
