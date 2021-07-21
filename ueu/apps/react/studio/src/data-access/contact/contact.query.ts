// akita
import { Query } from '@datorama/akita';

// store components
import { ContactState, contactStore, ContactStore } from './contact.store';

export class ContactQuery extends Query<ContactState> {
    constructor(protected store: ContactStore) {
        super(store);
    }
}

export const contactQuery = new ContactQuery(contactStore);
