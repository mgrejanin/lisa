import { Injectable } from '@angular/core';

// akita
import { Query } from '@datorama/akita';

// store components
import { ContactState, ContactStore } from './contact.store';

// rxjs
import { Observable } from 'rxjs';

// interfaces
import { ContactTagGroup } from '../../models';

@Injectable({ providedIn: 'root' })
export class ContactQuery extends Query<ContactState> {
    tags$: Observable<ContactTagGroup>;

    constructor(protected store: ContactStore) {
        super(store);

        this.tags$ = this.select(state => state.tags);
    }
}
