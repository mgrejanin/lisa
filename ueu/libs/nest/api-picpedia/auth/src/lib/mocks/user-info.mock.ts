import { UserInfoViewModel } from '../entities/auth/view-models/user-info.vm';

export const mockUserInfo: UserInfoViewModel = {
    exp: 1624979019,
    iat: 1624978719,
    auth_time: 1624978718,
    jti: 'mockValue',
    iss: 'mockValue',
    aud: 'mockValue',
    sub: 'mockValue',
    typ: 'mockValue',
    azp: 'mockValue',
    nonce: 'mockValue',
    session_state: 'mockValue',
    name: 'mockValue',
    given_name: 'mockValue',
    family_name: 'mockValue',
    preferred_username: 'mockValue',
    email: 'mockValue',
    email_verified: true,
    acr: 'mockValue',
    realm_access: {
        roles: ['mockValue'],
    },
    resource_access: {
        account: {
            roles: ['mockValue'],
        },
    },
    scope: 'mockValue',
    client_id: 'mockValue',
    username: 'mockValue',
    active: true,
};
