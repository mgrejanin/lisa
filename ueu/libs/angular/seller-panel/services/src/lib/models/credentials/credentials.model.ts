export interface ClientID {
    client_id: string;
}

export interface ClientSecret {
    client_secret: string;
}

export interface InfoCredential {
    name: string;
    client_id: string;
    enabled: boolean;
}

export interface ProjectCredential {
    project_name: string;
    callback_url: string;
}

export interface Credentials {
    _id: string;
    name: string;
    description: null;
    client_id: string;
    environment: string;
    scopes: Scopes[];
    api_key: string;
    updated_at: string;
    created_at: string;
    enabled?: boolean;
}

export interface Scopes {
    id: string;
    name: string;
    description: string;
}
