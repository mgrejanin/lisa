import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, map, tap, timeout } from 'rxjs/operators';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { removeUndefinedNull } from '@picpay/angular/shared/helpers';

import { SellerAccessConfig } from '../../config';
import {
    B2PExtractProjects,
    DownloadReporter,
    Extract,
    FutureReleasesList,
    RequestResponse,
    Wallet,
} from '../../models';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

@Injectable()
export class ExtractService {
    constructor(
        protected config: CoreDataAccessService<SellerAccessConfig>,
        private http: HttpClient,
        private notificationService: NotificationsService,
    ) {}

    getExtract(page = 0, perPage = 10, lastDate?: string): Observable<Extract> {
        let params: HttpParams;

        if (lastDate) {
            params = new HttpParams().set('page', `${page}`).set('per_page', `${perPage}`).set('last_date', lastDate);
        } else {
            params = new HttpParams().set('page', `${page}`).set('per_page', `${perPage}`);
        }

        return this.http
            .get<RequestResponse<Extract>>(`${this.config.getConfig().apiUrl}/v2/transactions/extract`, { params })
            .pipe(map(response => response.data));
    }

    getWalletBalance(): Observable<Wallet> {
        return this.http
            .get<RequestResponse<Wallet>>(`${this.config.getConfig().apiUrl}/v2/transactions/wallet-balance`)
            .pipe(map(response => response.data));
    }

    getFutureReleases(): Observable<FutureReleasesList> {
        return this.http
            .get<RequestResponse<FutureReleasesList>>(
                `${this.config.getConfig().apiUrl}/v2/transactions/next-movements`,
            )
            .pipe(map(response => response.data));
    }

    getExtractProjects(): Observable<B2PExtractProjects[]> {
        return this.http
            .get<RequestResponse<B2PExtractProjects[]>>(`${this.config.getConfig().apiUrl}/b2p/projects`)
            .pipe(map(response => response.data));
    }

    downloadExtract(projectId: string, startDate: string, endDate: string) {
        const MAX_REQUEST_TIMEOUT = 8_000;

        let params: HttpParams = new HttpParams();
        params = params.append('project_id', projectId);
        params = params.append('start_date', startDate);
        params = params.append('end_date', endDate);

        return this.http.get(`${this.config.getConfig().apiUrl}/b2p/report`, { params, responseType: 'blob' }).pipe(
            timeout(MAX_REQUEST_TIMEOUT),
            catchError(error =>
                error instanceof TimeoutError
                    ? throwError(new HttpErrorResponse({ status: 504, ...error }))
                    : throwError(error),
            ),
            map(csv => new Blob([csv], { type: 'text/csv' })),
        );
    }

    exportExtract(filters: DownloadReporter = {}): Observable<{ message: string }> {
        const params = new HttpParams({ fromObject: removeUndefinedNull(filters) });

        return this.http
            .get<{ message: string }>(`${this.config.getConfig().apiUrl}/transactions/exportExtract`, {
                params,
            })
            .pipe(
                tap(response => {
                    this.notificationService.openSnackbar(response.message, SnackbarTypes.DONE);
                }),
            );
    }

    finishOnboarding(): void {
        this.http.put<string>(`${this.config.getConfig().apiUrl}/v2/hide-receivables-onboarding`, null).subscribe();
    }
}
