import { of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Login, LoginResponse } from '../model/auth.model';
import { UpdatePassword } from '../model';

export const bodyAuth = {
    cnpj: '00.000.000/0000-00',
    email: 'picpaytest@gmail.com',
    password: '123456',
};

export const bodyUpdatePassword = {
    password: '123456',
    old_password: '101010',
    password_confirmation: '101010',
};

export const bodyStepOne = {
    ignore_interceptor: true,
    cnpj: '00.000.000/0000-00',
    email: 'test@pgmail.com',
};

export const bodyStepTwo = {
    email: 'test@pgmail.com',
    password_recovery_key: 'test',
    password: 'test123',
    password_confirmation: 'test123',
};

export const bodyVerifyPassword = {
    password: '123456',
};

export class SellerPanelAuthServiceMock {
    sellerEmail: any;

    setLocalStorage(data: LoginResponse): void {
        localStorage.setItem('token_transaction', data.token_transaction);
        localStorage.setItem('token_transaction_expires_in', data.token_transaction_expires_in);
        localStorage.setItem('token_refresh', data.token_refresh);
        localStorage.setItem('token_refresh_expires_in', data.token_refresh_expires_in);
        localStorage.setItem('timezone', JSON.stringify(data.timezone));

        if (data.token_biz) {
            localStorage.setItem('token_biz', data.token_biz);
        }
    }

    getLocalStorage() {
        const token_transaction = localStorage.getItem('token_transaction');
        const token_transaction_expires_in = localStorage.getItem('token_transaction_expires_in');
        const token_refresh = localStorage.getItem('token_refresh');
        const token_refresh_expires_in = localStorage.getItem('token_refresh_expires_in');
        const timezone = localStorage.getItem('timezone');

        return {
            token_transaction,
            token_transaction_expires_in,
            token_refresh,
            token_refresh_expires_in,
            timezone,
        };
    }

    isLogged() {
        const currentTime = new Date();
        const tokenRefreshTimeExpires = new Date(this.getLocalStorage().token_refresh_expires_in);

        return currentTime < tokenRefreshTimeExpires;
    }

    login(body: Login) {
        return of({
            token_transaction: '745f6ada-8d82-4483-9122-4b8b87a8f9d9',
            token_transaction_expires_in: '2020-07-30 12:57:58',
            token_refresh: 'd1b6a0e8-a1ae-486d-8e5b-89f0c8660ce0',
            token_refresh_expires_in: '2020-07-30 13:27:58',
            token_biz: '1ngB333GumIBaoeRwtdcfiRrdZiY1h6isIEJHLEw',
            seller: {},
            timezone: {},
        }).pipe(
            tap(() => {
                this.setLocalStorage({
                    token_transaction: '745f6ada-8d82-4483-9122-4b8b87a8f9d9',
                    token_transaction_expires_in: '2020-07-30 12:57:58',
                    token_refresh: 'd1b6a0e8-a1ae-486d-8e5b-89f0c8660ce0',
                    token_refresh_expires_in: '2020-07-30 13:27:58',
                    token_biz: '1ngB333GumIBaoeRwtdcfiRrdZiY1h6isIEJHLEw',
                    seller: {},
                });
            }),
            catchError(error => throwError(error)),
        );
    }

    refreshToken() {
        const token_refresh = localStorage.getItem('token_refresh');
        const token_refresh_expires_in = localStorage.getItem('token_refresh_expires_in');

        if (!token_refresh || new Date() > new Date(token_refresh_expires_in)) {
            this.logout();
        }

        return of({
            timezone: {
                timezone_type: 3,
                timezone: 'America/Sao_Paulo',
            },
            token_transaction: '7dbed44e-63f2-42cc-8105-951b7e601de7',
            token_transaction_expires_in: '2020-07-31 13:11:38',
            token_refresh: '908d443b-4ddf-4f7a-9587-0356021faed5',
            token_refresh_expires_in: '2020-07-31 13:41:38',
            token_biz: null,
        }).pipe(
            tap(() => {
                this.setLocalStorage({
                    timezone: {
                        timezone_type: 3,
                        timezone: 'America/Sao_Paulo',
                    },
                    token_transaction: '7dbed44e-63f2-42cc-8105-951b7e601de7',
                    token_transaction_expires_in: '2020-07-31 13:11:38',
                    token_refresh: '908d443b-4ddf-4f7a-9587-0356021faed5',
                    token_refresh_expires_in: '2020-07-31 13:41:38',
                    token_biz: null,
                });
            }),
            catchError(error => {
                this.logout();
                return of(error);
            }),
        );
    }

    clearLocalStorage() {
        localStorage.clear();
    }

    logout() {
        return of({
            ignore_interceptor: true,
        }).pipe(
            map(() => {
                [
                    'token_transaction',
                    'token_transaction_expires_in',
                    'token_refresh',
                    'token_refresh_expires_in',
                    'token_biz',
                    'seller',
                    'timezone',
                ].map(item => localStorage.removeItem(item));
            }),
        );
    }

    getForeignPanelUrl(): string {
        return 'http://localhost:4200/';
    }

    updatePassword(body: UpdatePassword) {
        return of({ sucesso: true }).pipe(catchError(error => of(error)));
    }

    changeLostPassword(body) {
        body.ignore_interceptor = true;
        return of({ message: 'Sucesso' }).pipe(
            map(response => response),
            catchError(error => of(error)),
        );
    }

    verifyPassword(body) {
        return of({ message: 'Autorizado' }).pipe(
            map(response => response),
            catchError(error => of(error)),
        );
    }

    requestNewPassword(body) {
        return of({
            message:
                // eslint-disable-next-line max-len
                'Enviamos um e-mail com uma chave para a recuperação de senha. Copie a chave recebida e cole aqui para recuperar sua senha.',
        });
    }
}
