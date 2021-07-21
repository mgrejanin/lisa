import { Injectable } from '@angular/core';
import { SellerQuery } from '../../state/seller/seller.query';
import { EventTracking } from '@picpay/event-tracking';

@Injectable({
    providedIn: 'root',
})
export class EventTrackingService {
    constructor(private sellerQuery: SellerQuery) {}

    eventTrackingUserCliked(button_name: string, page: string, window: Window, document: Document): void {
        EventTracking.track('User Clicked', {
            page_name: `/${page}`,
            page_title: document.title,
            page_url: `${window.origin}/${page}`,
            user_agent: window.navigator.userAgent,
            button_name: button_name,
            user_id: this.sellerQuery.getValue().organization?.id,
        });
    }
}
