import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';

import { EventTracking } from '@picpay/event-tracking';

import {
    Login,
    LoginResponse,
    LogoutResponse,
    RequestLostPassword,
    RequestNewPassword,
    TokenRefreshResponse,
    UpdatePassword,
    UpdatePasswordResponse,
} from './model';

import { SellerService } from '@picpay/seller-panel/services';

import { SellerAccessConfig } from '@picpay/seller-panel/seller-access';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { NotificationsService } from '@picpay/angular/shared/core/notifications';

@Injectable({
    providedIn: 'root',
})
export class SellerPanelAuthService {
    sellerEmail: string;

    constructor(
        private http: HttpClient,
        private router: Router,
        private notificationService: NotificationsService,
        private sellerService: SellerService,
        protected config: CoreDataAccessService<SellerAccessConfig>,
    ) {}

    setLocalStorage(data: LoginResponse): void {
        const tokenKeys = [
            'token_biz',
            'token_transaction',
            'token_transaction_expires_in',
            'token_refresh',
            'token_refresh_expires_in',
            'timezone',
        ];

        tokenKeys.forEach(key => {
            if (data[key]) {
                if (key === 'timezone') {
                    localStorage.setItem(key, JSON.stringify(data[key]));
                } else {
                    localStorage.setItem(key, data[key]);
                }
            }
        });
    }

    getLocalStorage(): LoginResponse {
        const token_biz = localStorage.getItem('token_biz');
        const token_transaction = localStorage.getItem('token_transaction');
        const token_transaction_expires_in = localStorage.getItem('token_transaction_expires_in');
        const token_refresh = localStorage.getItem('token_refresh');
        const token_refresh_expires_in = localStorage.getItem('token_refresh_expires_in');
        const timezone = JSON.parse(localStorage.getItem('timezone'));

        return {
            token_biz,
            token_transaction,
            token_transaction_expires_in,
            token_refresh,
            token_refresh_expires_in,
            timezone,
        };
    }

    isLogged(): boolean {
        const currentTime = new Date();
        const tokenRefreshValue = this.getLocalStorage().token_refresh_expires_in
            ? this.getLocalStorage().token_refresh_expires_in.replace(' ', 'T')
            : null;
        const tokenRefreshTimeExpires = new Date(tokenRefreshValue);

        return localStorage.getItem('token_refresh') !== null && currentTime < tokenRefreshTimeExpires;
    }

    login(body: Login): Observable<LoginResponse> {
        return this.http
            .post(`${this.config.getConfig().apiUrl}/user/login`, { ...body, ignore_interceptor: true })
            .pipe(
                tap((response: LoginResponse) => {
                    this.setLocalStorage(response);
                    this.sellerService.setSellerData(response.seller);
                }),
                catchError(error => throwError(error)),
            );
    }

    refreshToken(): Observable<TokenRefreshResponse> {
        const token_refresh = localStorage.getItem('token_refresh');
        const header = new HttpHeaders().set('Authorization', `Bearer ${token_refresh}`);

        return this.http
            .post(`${this.config.getConfig().apiUrl}/user/refresh`, { ignore_interceptor: true }, { headers: header })
            .pipe(
                tap((response: TokenRefreshResponse) => {
                    this.setLocalStorage(response);
                }),
                catchError(error => throwError(error)),
            );
    }

    logout(): void {
        const request$ = new Subject<void>();
        const token_refresh = localStorage.getItem('token_refresh');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token_refresh}`);

        this.http
            .post<LogoutResponse>(
                `${this.config.getConfig().apiUrl}/user/logout`,
                { ignore_interceptor: true },
                { headers },
            )
            .pipe(
                takeUntil(request$),
                tap(() => {
                    this.clearLocalStorage();
                }),
                catchError(error => throwError(error)),
                finalize(async () => {
                    EventTracking.logout();
                    await this.router.navigate(['/login']);
                    request$.next();
                    request$.complete();
                }),
            )
            .subscribe();
    }

    updatePassword(body: UpdatePassword): Observable<UpdatePasswordResponse> {
        return this.http
            .post<UpdatePasswordResponse>(`${this.config.getConfig().apiUrl}/user/changePassword`, body)
            .pipe(tap(() => this.notificationService.openSnackbar('Sua senha foi atualizada com sucesso!')));
    }

    requestNewPassword(body: RequestNewPassword): Observable<{ message: string }> {
        this.sellerEmail = body.email;

        return this.http.post<{ message: string }>(`${this.config.getConfig().apiUrl}/user/recoveryPasswordStepOne`, {
            ...body,
            ignore_interceptor: true,
        });
    }

    clearLocalStorage() {
        localStorage.clear();
        this.sellerService.clearSellerData();
    }

    changeLostPassword(body: RequestLostPassword): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(`${this.config.getConfig().apiUrl}/user/recoveryPasswordStepTwo`, {
            ...body,
            ignore_interceptor: true,
        });
    }
}
