import { EventTrackingEnvironment } from '../models';

const requestHeaders: RequestInit = {
    method: 'POST',
    headers: {
        'x-event-key': `96A7173663281ACDBFC97B791592F5BF`,
        'Content-Type': 'application/json',
    },
};

export const DevEnvironment: EventTrackingEnvironment = {
    apiUrl: 'http://api-event-tracking.ms.qa.limbo.work',
    requestHeaders,
};
