import { AuthUserRoles } from './auth-user-roles.model';

export interface AuthUser {
    id: string;
    name: string;
    picture: string;
    fullname: string;
    email: string;
    roles: AuthUserRoles;
}
