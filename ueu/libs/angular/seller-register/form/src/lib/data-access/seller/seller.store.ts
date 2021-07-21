import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { SellerState } from '../../models/seller.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'seller', resettable: true })
export class SellerStore extends Store<SellerState> {
    constructor() {
        super({});
    }

    updateDataSeller(dataSeller: SellerState): void {
        this.update(() => dataSeller);
    }
}
