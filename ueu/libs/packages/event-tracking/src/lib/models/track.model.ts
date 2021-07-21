import { EventTrackingUserType } from './user-type.model';

export interface EventTrackModel {
    userId?: string;
    anonymousId?: string;
    context: Record<string, unknown>;
    event?: string;
    name?: string;
    properties: Record<string, unknown>;
    keyType: EventTrackingUserType;
}
