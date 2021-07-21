import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, retry, switchMap, take } from 'rxjs/operators';

import { getErrorMessage } from '@picpay/seller-panel/helpers';

import { SellerPanelAuthService } from '../auth.service';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

@Injectable()
export class SellerPanelRequestInterceptor implements HttpInterceptor {
    isRefreshing: boolean;
    tokenSubject: BehaviorSubject<string>;

    constructor(private notificationService: NotificationsService, private authService: SellerPanelAuthService) {
        this.isRefreshing = false;
        this.tokenSubject = new BehaviorSubject(null);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('token_transaction') as string;
        const ignoreInterceptor = req?.body?.ignore_interceptor ? req?.body?.ignore_interceptor : false;

        if ((req?.body && ignoreInterceptor) || req?.url.includes('.svg')) {
            return next.handle(req);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const authRequest: HttpRequest<any> =
            token !== null && ignoreInterceptor ? req.clone() : this.addToken(req, token);

        return next
            .handle(authRequest)
            .pipe(catchError((error: HttpErrorResponse) => this.handleError(error, req, next)));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private handleUnauthorizedError(req: HttpRequest<any>, next: HttpHandler) {
        if (this.isRefreshing) {
            return this.tokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => next.handle(this.addToken(req, token))),
            );
        }

        this.isRefreshing = true;
        this.tokenSubject.next(null);

        return this.authService.refreshToken().pipe(
            retry(1),
            switchMap(response => {
                if (response.token_transaction) {
                    this.authService.setLocalStorage(response);

                    this.tokenSubject.next(response.token_transaction);

                    return next.handle(this.addToken(req, response.token_transaction));
                }

                this.authService.logout();

                return throwError('Sua sessão foi expirada.');
            }),
            catchError(error => {
                this.authService.logout();
                this.notificationService.openSnackbar(getErrorMessage(error), SnackbarTypes.ERROR);

                return throwError(error);
            }),
            finalize(() => {
                this.isRefreshing = false;
            }),
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private handleError(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!window.navigator.onLine) {
            this.notificationService.openSnackbar('Sem conexão a internet! Tente novamente.', SnackbarTypes.ERROR);
            return throwError(error);
        }
        switch (error.status) {
            case 401:
                return this.handleUnauthorizedError(req, next);
            default:
                this.notificationService.openSnackbar(getErrorMessage(error), SnackbarTypes.ERROR);
                return throwError(error);
        }
    }
}
