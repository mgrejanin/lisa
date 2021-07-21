// store components
import { contactStore, ContactStore } from './contact.store';

// rxjs
import { Observable, Subject } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { takeUntil } from 'rxjs/operators';

// Models
import { Contact, ContactTagResponse } from '../../models';
import { environment } from '../../environments/environment';

export class ContactService {
    private readonly unsubscribe$: Subject<void>;
    private url = environment.apiUrl;

    constructor(private store: ContactStore) {
        this.unsubscribe$ = new Subject();
    }

    getTags(): void {
        this.startRequest();

        ajax.getJSON<ContactTagResponse>(`${this.url}/external/v1/contacts/tags`)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.store.update(res.data);
                this.closeRequest();
            });
    }

    sendContact(data: Contact): Observable<AjaxResponse> {
        return ajax.post(`${this.url}/external/v1/contacts/send`, data);
    }

    private startRequest(): void {
        this.unsubscribe$.next();
        this.store.setLoading(true);
    }

    private closeRequest(): void {
        this.unsubscribe$.next();
        this.store.setLoading(false);
    }
}
export const contactService = new ContactService(contactStore);
