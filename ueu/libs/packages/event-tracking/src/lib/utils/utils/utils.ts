import { v4 as uuid } from 'uuid';

// models
import { EventTrackingTrackingType, EventTrackModel } from '../../models';

import { EventTrackingConfig, EventTrackingInternalConfig } from '../../models/event-tracking-config.model';
import { EventTrackingStorage, Storage } from '../storage/storage';

export class EventTrackingUtils {
    private readonly config: Partial<EventTrackingInternalConfig>;

    constructor(private storage: EventTrackingStorage) {
        this.config = {};
    }

    private createAnonymousId(): string {
        return `WEB-${uuid()}-${new Date().getTime()}`;
    }

    configureModel(model: EventTrackModel): EventTrackModel {
        this.mergeConfig(this.storage.getID());
        const config = { ...this.config };

        if (config.userId) {
            model.userId = config.userId;
            model.anonymousId = null;
            return model;
        }

        model.userId = null;

        if (config.anonymousId) {
            model.anonymousId = config.anonymousId;
            return model;
        }

        model.anonymousId = this.createAnonymousId();

        this.storage.storeID(EventTrackingTrackingType.ANONYMOUS, model.anonymousId);

        return model;
    }

    mergeConfig(config: Partial<EventTrackingConfig | EventTrackingInternalConfig>): void {
        Object.assign(this.config, { ...config, initialized: true });
    }

    getConfig(): Partial<EventTrackingInternalConfig> {
        return Object.freeze({ ...this.config });
    }
}

export const Utils = new EventTrackingUtils(Storage);
