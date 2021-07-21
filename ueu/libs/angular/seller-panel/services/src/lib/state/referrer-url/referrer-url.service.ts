import { Injectable } from '@angular/core';
import { ReferrerUrlStore } from './referrer-url.store';
@Injectable({ providedIn: 'root' })
export class ReferrerUrlService {
    constructor(private referrerUrlStore: ReferrerUrlStore) {}

    getPreviousPage(url: string) {
        this.referrerUrlStore.setPageUrl({ url });
    }
}
