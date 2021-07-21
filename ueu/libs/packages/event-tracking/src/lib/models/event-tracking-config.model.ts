import { EventTrackingUserType } from './user-type.model';

export interface EventTrackingConfig {
    userId?: string;
    userType: EventTrackingUserType;
    production: boolean;
}

export interface EventTrackingInternalConfig extends EventTrackingConfig {
    anonymousId?: string;
    initialized?: boolean;
}
