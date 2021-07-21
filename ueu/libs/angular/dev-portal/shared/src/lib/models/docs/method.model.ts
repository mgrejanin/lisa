import { Endpoint } from './endpoint.model';
export interface Method {
    path?: string;
    post?: Endpoint;
    get?: Endpoint;
    put?: Endpoint;
    delete?: Endpoint;
    patch?: Endpoint;
}
