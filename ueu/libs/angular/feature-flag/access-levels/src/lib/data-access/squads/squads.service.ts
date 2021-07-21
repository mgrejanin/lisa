import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// data-access
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

// rxjs
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

// store components
import { SquadsStore } from './squads.store';

// interfaces
import { Squad } from '../../models';

// @picpay
import { Unsubscriber } from '@picpay/angular/shared/helpers';

@Injectable({
    providedIn: 'root',
})
export class SquadsService {
    @Unsubscriber() private readonly unsubscribe$: Subject<void>;

    constructor(private config: CoreDataAccessService, private http: HttpClient, private squadsStore: SquadsStore) {
        this.unsubscribe$ = new Subject();
    }

    getSquads(): void {
        this.unsubscribe$.next();

        const url = `${this.config.getConfig().apiUrl}/flags/users/squads/admin`;
        this.http
            .get(url)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.unsubscribe$.next()),
            )
            .subscribe((squads: Squad[]) => {
                this.squadsStore.set(squads);
            });
    }

    updateFilter(filter: string): void {
        this.squadsStore.update({
            filter,
        });
    }

    clearFilter(): void {
        this.squadsStore.update({
            filter: 'ALL',
        });
    }
}
