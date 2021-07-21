import { EventTrackingTrackingType } from '../../models';
export class EventTrackingStorage {
    private createKey(trackingType: EventTrackingTrackingType): string {
        return `pp-event-tracking-${trackingType}-id`;
    }

    storeID(trackingType: EventTrackingTrackingType, id: string): void {
        localStorage.setItem(this.createKey(trackingType), id);
    }

    getID(): { userId: string } | { anonymousId: string } {
        const userId = localStorage.getItem(this.createKey(EventTrackingTrackingType.USER));

        if (userId) {
            return { userId };
        }

        return { anonymousId: localStorage.getItem(this.createKey(EventTrackingTrackingType.ANONYMOUS)) };
    }

    clearIDs(): void {
        localStorage.removeItem(this.createKey(EventTrackingTrackingType.USER));
        localStorage.removeItem(this.createKey(EventTrackingTrackingType.ANONYMOUS));
    }
}

export const Storage = new EventTrackingStorage();
