// models
import { EventTrackingConfig } from '../models/event-tracking-config.model';

// validators
import { EventTrackingValidators } from '../utils';
export class MockEventTrackingClass {
    constructor(private validators: EventTrackingValidators) {}

    init(eventTrackingConfig: EventTrackingConfig): void {
        eventTrackingConfig;
        // do nothing
    }

    login(userId: string): void {
        userId;
        // do nothing
    }

    logout(): void {
        // do nothing
    }

    async page(eventName: string, payload: Record<string, unknown>): Promise<Response> {
        payload;

        this.validators.isEventNameValid(eventName, `track`);

        return Promise.resolve({ ok: true } as Response);
    }

    async track(eventName: string, payload?: Record<string, unknown>): Promise<Response> {
        payload;

        this.validators.isEventNameValid(eventName, `track`);

        return Promise.resolve({ ok: true } as Response);
    }
}
