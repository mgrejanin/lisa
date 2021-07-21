import { Injectable } from '@angular/core';
import { SellerState } from '../../models/seller.model';
import { SellerStore } from './seller.store';

@Injectable({ providedIn: 'root' })
export class SellerService {
    constructor(private sellerStore: SellerStore) {}

    updateDataSeller(dataSeller: SellerState): void {
        this.sellerStore.updateDataSeller(dataSeller);
    }

    setLoading(state: boolean): void {
        this.sellerStore.setLoading(state);
    }

    resetSeller(): void {
        this.sellerStore.reset();
    }
}
