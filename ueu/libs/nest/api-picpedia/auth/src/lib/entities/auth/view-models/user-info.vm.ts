export interface UserInfoViewModel {
    exp: number;
    iat: number;
    auth_time: number;
    jti: string;
    iss: string;
    aud: string;
    sub: string;
    typ: string;
    azp: string;
    nonce: string;
    session_state: string;
    name: string;
    given_name: string;
    family_name: string;
    preferred_username: string;
    email: string;
    email_verified: boolean;
    acr: string;
    'allowed-origins'?: string[];
    realm_access: RealmAccess;
    resource_access: ResourceAccess;
    scope: string;
    client_id: string;
    username: string;
    active: boolean;
}

export interface ResourceAccess {
    account: RealmAccess;
}

export interface RealmAccess {
    roles: string[];
}
