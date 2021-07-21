import { Endpoint } from '@picpay/dev-portal/shared';

export interface EndpointGroup {
    tag: string;
    endpoints: Endpoint[];
}
