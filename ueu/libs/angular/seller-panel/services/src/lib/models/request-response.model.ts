export interface RequestResponse<T> {
    meta?: {
        code: number;
    };
    data?: T;
}

export enum RequestStatusCodeErrorResponse {
    INTERNAL_SERVER_ERROR = 500,
    GATEWAY_TIMEOUT_ERROR = 504,
}
