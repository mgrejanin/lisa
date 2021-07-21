import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// @picpay
import { Unsubscriber } from '@picpay/angular/shared/helpers';

// data-access
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

// rxjs
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

// store components
import { UsersStore } from './users.store';

// interfaces
import { User } from '../../models';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    @Unsubscriber() private readonly unsubscribe$: Subject<void>;

    constructor(private http: HttpClient, private usersStore: UsersStore, private config: CoreDataAccessService) {
        this.unsubscribe$ = new Subject();
    }

    getUsers(filter: string): void {
        this.unsubscribe$.next();

        const url = `${this.config.getConfig().apiUrl}/flags/users/search`;

        this.http
            .post(url, {
                filter: {
                    contains: filter,
                },
            })
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => this.unsubscribe$.next()),
            )
            .subscribe((users: User[]) => {
                this.usersStore.set(users);
            });
    }
}
