import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarTypes } from '../../models';

// services
import { NotificationsService } from '../../services/notifications/notifications.service';

@Injectable()
export class ErrNotificationInterceptor implements HttpInterceptor {
    constructor(private notifications: NotificationsService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError(error => {
                this.handleError(error);

                return throwError(error);
            }),
        );
    }

    private handleError(error: HttpErrorResponse): void {
        const message =
            error.error && error.error.message
                ? error.error.message
                : 'Ops! Ocorreu um erro inesperado ao processar a sua solicitação.';

        this.notifications.openSnackbar(message, SnackbarTypes.ERROR);
    }
}
