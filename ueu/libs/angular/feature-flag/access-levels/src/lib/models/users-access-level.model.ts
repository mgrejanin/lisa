export interface UsersAccess {
    id: string;
    email?: string;
    name: string;
    picture?: string;
    role: string;
}

export interface RolesUser {
    id: string;
    name: string;
}

export interface UserBaseEmail {
    id: string;
    name: string;
    email?: string;
    picture?: string;
    username: string;
    consumer_id: number;
}

export interface UpdateRoleUser {
    id: string;
    role: string;
    squad: string;
}

export interface UpdateRoleUserResponse {
    id: string;
    name: string;
    picture: string;
    role: string;
}

export interface RemoveRoleUser {
    id: string;
    role: string;
    squad: string;
}

export interface AddRoleUser {
    id: string;
    role: string;
    squad: string;
}

export interface AddRoleUserResponse {
    id: string;
    name: string;
    picture: string;
    role: string;
}
