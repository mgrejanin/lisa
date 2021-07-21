import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
// interfaces
import { RechargeData } from '../../models';

export interface RechargesState {
    recharges: RechargeData[];
    isLoading: boolean;
    totalRecharges: number;
}

function createInitialState(): RechargesState {
    return {
        recharges: [],
        isLoading: false,
        totalRecharges: 0,
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'recharges' })
export class RechargesStore extends Store<RechargesState> {
    constructor() {
        super(createInitialState());
    }

    updateRecharges(recharges: RechargeData[]): void {
        this.update({ recharges });
    }

    updateTotalRecharges(totalRecharges: number): void {
        this.update({ totalRecharges });
    }

    updateRecharge({ id, comments, value, value_srt }: Partial<RechargeData>): void {
        const allRecharges = this.getValue().recharges;

        const updatedRecharge = allRecharges.find(recharge => recharge.id === id);

        updatedRecharge.comments = comments;
        updatedRecharge.value = value;
        updatedRecharge.value_srt = value_srt;

        this.update({
            recharges: [...allRecharges],
        });
    }
}
