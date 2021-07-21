import { EventTrackingEnvironment, EventTrackingTrackingType, EventTrackModel } from './models';
import { EventTrackingConfig } from './models/event-tracking-config.model';

// mocks
import { MockEventTrackingClass } from './mocks/event-tracking.mock';

// utils
import { EventTrackingStorage, Storage, EventTrackingValidators, Validators, EventTrackingUtils, Utils } from './utils';

// environments
import { DevEnvironment, ProductionEnvironment } from './environments';

// eslint-disable-next-line
var global: any;
export class EventTrackingClass {
    private environment: EventTrackingEnvironment;

    constructor(
        private validators: EventTrackingValidators,
        private storage: EventTrackingStorage,
        private utils: EventTrackingUtils,
    ) {
        this.environment = DevEnvironment;
    }

    init(eventTrackingConfig: EventTrackingConfig): void {
        this.utils.mergeConfig(eventTrackingConfig);

        const config = this.utils.getConfig();

        this.environment = config.production ? ProductionEnvironment : DevEnvironment;

        if (config.userId) {
            this.storage.storeID(EventTrackingTrackingType.USER, config.userId);
        }
    }

    login(userId: string): void {
        this.validators.isInitialized('login');
        this.utils.mergeConfig({ userId });
    }

    /**
     * The logout method clear all ids and prepare for a new initialization, that can be anonymous or with user id
     */
    logout(): void {
        this.storage.clearIDs();
        this.utils.mergeConfig({ initialized: false });
    }

    /**
     * The page method lets you record page views on your website, along with optional extra information about the page being viewed.
     * @param event Name of the event. For example: 'Page Viewed'
     * @param payload Optional extra information about the page being viewed
     */
    async page(eventName: string, payload: Record<string, unknown>): Promise<Response> {
        this.validators.isInitialized('page');
        this.validators.isEventNameValid(eventName, 'page');
        const config = this.utils.getConfig();

        const trackData: EventTrackModel = this.utils.configureModel({
            context: {
                browser: window.navigator.userAgent,
            },
            name: eventName,
            properties: payload,
            keyType: config.userType,
        });

        return fetch(`${this.environment.apiUrl}/event-collector/page`, {
            ...this.environment.requestHeaders,
            body: JSON.stringify(trackData),
        });
    }

    /**
     * Record the actions your users perform. Every action triggers what we call an “event”, which can also have associated properties.
     * You’ll want to track events that are indicators of success for your site, like Signed Up, Item Purchased or Article Bookmarked.
     * To get started, we recommend tracking just a few important events. You can always add more later!
     * @param event Name of the event you want to track
     * @param payload Whatever data related to this event you want to send
     */
    async track(eventName: string, payload: Record<string, unknown>): Promise<Response> {
        this.validators.isInitialized('track');
        this.validators.isEventNameValid(eventName, 'track');
        const config = this.utils.getConfig();

        const trackData: EventTrackModel = this.utils.configureModel({
            context: {
                browser: window.navigator.userAgent,
            },
            event: eventName,
            properties: payload,
            keyType: config.userType,
        });

        return fetch(`${this.environment.apiUrl}/event-collector/track`, {
            ...this.environment.requestHeaders,
            body: JSON.stringify(trackData),
        });
    }
}

export const EventTracking = global?.__DEV__
    ? new MockEventTrackingClass(Validators)
    : new EventTrackingClass(Validators, Storage, Utils);
