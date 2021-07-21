import { EventTrackingEnvironment } from '../models';

const requestHeaders: RequestInit = {
    method: 'POST',
    headers: {
        'x-event-key': `cRlu7fuR853f2y8Ngfnn14EYgqIbbx12`,
        'Content-Type': 'application/json',
    },
};

export const ProductionEnvironment: EventTrackingEnvironment = {
    apiUrl: 'https://api-event-tracking.picpay.com',
    requestHeaders,
};
