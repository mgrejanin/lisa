// classes

import { EventTrackingUtils, Utils } from '../utils/utils';

export class EventTrackingValidators {
    constructor(private utils: EventTrackingUtils) {}

    isInitialized(currentMethod: string): void {
        const config = this.utils.getConfig();

        if (!config.initialized) {
            throw new Error(`You need to initialize the library with "init" method before calling "${currentMethod}".`);
        }
    }

    isEventNameValid(eventName: string, currentMethod: string): void {
        if (!eventName) {
            throw new Error(`You need to have an event name to use "${currentMethod}" method.`);
        }

        if (!this.hasManifestoPattern(eventName)) {
            throw new Error(`
                The event name "${eventName}" needs to follow the manifesto:
                https://picpay.atlassian.net/wiki/spaces/ET/pages/874124162/Manifesto+de+Event+Tracking

                TLDR:
                    - Use object-action framework. Example: object(Receipt) action(Viewed)
                    - Use Proper Case. Example: Receipt Viewed
                    - Use only English words
            `);
        }
    }

    private hasManifestoPattern(eventName: string): boolean {
        const eventNameStrings = eventName.split(/\s/);

        for (const [firstLetter] of eventNameStrings) {
            if (parseInt(firstLetter) || firstLetter !== firstLetter.toUpperCase()) {
                return false;
            }
        }

        return true;
    }
}

const utils = Utils;

export const Validators = new EventTrackingValidators(utils);
