import { SellerResponse } from '@picpay/seller-panel/services';

export interface Login {
    cnpj: string;
    email: string;
    password: string;
    trackingToken?: string;
    recaptcha?: string;
    ignore_interceptor?: boolean;
}

export interface LoginResponse {
    token_biz: string;
    token_transaction: string;
    token_transaction_expires_in: string;
    token_refresh: string;
    token_refresh_expires_in: string;
    seller?: SellerResponse;
    timezone?: Timezone;
}

export interface TokenRefreshResponse {
    token_transaction: string;
    token_transaction_expires_in: string;
    token_refresh_expires_in: string;
    token_refresh: string;
    token_biz: string;
    timezone?: Timezone;
}

export interface LogoutResponse {
    success: boolean;
    message: string;
}

export interface Timezone {
    timezone_type: number;
    timezone: string;
}
