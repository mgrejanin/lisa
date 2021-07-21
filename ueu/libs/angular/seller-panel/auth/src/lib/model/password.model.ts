export interface UpdatePassword {
    password: string;
    old_password: string;
    password_confirmation: string;
}

export interface RequestLostPassword {
    password_recovery_key: string;
    password: string;
    password_confirmation: string;
    email?: string;
    ignore_interceptor?: boolean;
}

export interface RequestNewPassword {
    email: string;
    cnpj: string;
    ignore_interceptor?: boolean;
}

export interface UpdatePasswordResponse {
    sucesso: boolean;
}
