import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface ReferrerUrlState {
    url: string;
}

function createInitialState(): ReferrerUrlState {
    return {
        url: null,
    };
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'referrer-url', resettable: true })
export class ReferrerUrlStore extends Store<ReferrerUrlState> {
    constructor() {
        super(createInitialState());
    }

    setPageUrl(url: ReferrerUrlState): void {
        this.update(url);
    }
}
