import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// data-access
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
// interfaces
import { Recharge, RechargeData, RechargeUpdate } from '../../models';
// rxjs
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';

// store components
import { RechargesStore } from './recharges.store';

import { Unsubscriber } from '@picpay/angular/shared/helpers';

@Injectable({ providedIn: 'root' })
export class RechargesService {
    @Unsubscriber() private readonly unsubscribe$: Subject<void>;

    constructor(
        private config: CoreDataAccessService,
        private rechargesStore: RechargesStore,
        private http: HttpClient,
    ) {
        this.unsubscribe$ = new Subject();
    }

    getRecharges(): void {
        this.startRequest();

        const event = {
            page: 1,
            pageSize: 10,
            sortBy: 'id_counter',
            sortOrder: 'DESC',
        };
        const filter = [{ show_name: 'Status', show_value: 'Aguardando', name: 'status_id', value: 'O' }];

        const params = new HttpParams()
            .set('page', event.page.toString())
            .set('page_size', event.pageSize.toString())
            .set('sortBy', event.sortBy)
            .set('sortOrder', event.sortOrder)
            .set('filters', JSON.stringify(filter));

        const url = `${this.config.getConfig().apiUrl}/recharges`;

        this.http
            .get(url, { params })
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.closeRequest()),
            )
            .subscribe((response: Recharge) => {
                this.rechargesStore.updateRecharges(response.data);
                this.rechargesStore.updateTotalRecharges(response.total);
            });
    }

    updateRechargeValue({ id, value, value_srt }: Partial<RechargeData>): Observable<RechargeUpdate> {
        const url = `${this.config.getConfig().apiUrl}/recharges/updateValue`;
        const body = { id, value };

        return this.http.patch(url, body).pipe(
            takeUntil(this.unsubscribe$),
            tap((response: RechargeUpdate) => {
                const updatedDatas = {
                    id: response.data._id,
                    comments: response.data.comments,
                    value: response.data.value,
                    value_srt,
                };

                this.rechargesStore.updateRecharge(updatedDatas);
            }),
            catchError(error => {
                return throwError(error);
            }),
        );
    }

    // private helpers
    private startRequest(): void {
        this.unsubscribe$.next();

        this.rechargesStore.update({ isLoading: true });
    }

    private closeRequest(): void {
        this.unsubscribe$.next();

        this.rechargesStore.update({ isLoading: false });
    }
}
