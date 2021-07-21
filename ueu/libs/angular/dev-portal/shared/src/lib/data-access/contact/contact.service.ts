import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';

// store components
import { ContactStore } from './contact.store';

// rxjs
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

// data-access
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

// Models
import { DevPortalDataAccessConfig } from '../dev-portal-data-access.config';
import { Contact, ContactReponse, ContactTagResponse } from '../../models';

@Injectable({ providedIn: 'root' })
export class ContactService implements OnDestroy {
    private readonly unsubscribe$: Subject<void>;
    private url = this.config.getConfig().apiUrl;

    constructor(
        private config: CoreDataAccessService<DevPortalDataAccessConfig>,
        private http: HttpClient,
        private store: ContactStore,
    ) {
        this.unsubscribe$ = new Subject();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    getTags(typeTags: string): void {
        this.startRequest();

        this.http
            .get<ContactTagResponse>(`${this.url}/external/v1/contacts/tags?type=${typeTags}`)
            .pipe(
                takeUntil(this.unsubscribe$),
                finalize(() => {
                    this.closeRequest();
                }),
            )
            .subscribe((response: ContactTagResponse) => {
                this.store.updateTags(response.data);
            });
    }

    sendContact(data: Contact): Observable<ContactReponse> {
        return this.http.post<ContactReponse>(`${this.url}/external/v1/contacts/send`, data);
    }

    // Private helpers
    private startRequest(): void {
        this.unsubscribe$.next();
        this.store.setLoading(true);
    }

    private closeRequest(): void {
        this.unsubscribe$.next();
        this.store.setLoading(false);
    }
}
