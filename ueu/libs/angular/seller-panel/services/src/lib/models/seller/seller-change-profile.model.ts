import { SellerResponse } from './seller-response.model';

export interface SellerChildrenProfile {
    id: number | string;
    name: string;
    cpf_cnpj?: string;
}

export interface SellerChangeProfileResponse {
    token_biz: string;
    token_transaction: string;
    token_transaction_expires_in: string;
    token_refresh_expires_in: string;
    token_refresh: string;
    seller: SellerResponse;
    original_login_seller: SellerResponse;
    timezone: {
        timezone_type: number;
        timezone: string;
    };
}
