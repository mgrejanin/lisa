import { PersonalAddress } from './personal-address.model';
import { Responsible } from './responsible-data.model';

export interface SellerRecord {
    [key: string]: string;
}

export interface SellerState {
    step: number;
    hash?: string;
    token?: string;
    responsible?: Responsible;
    address?: PersonalAddress;
    company?: SellerRecord;
    address_company?: SellerRecord;
    password?: SellerRecord;
}
