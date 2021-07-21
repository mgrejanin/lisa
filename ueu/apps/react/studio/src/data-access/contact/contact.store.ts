import { EntityStore, StoreConfig } from '@datorama/akita';
import { ContactTag } from '../../models';

export interface ContactState {
    [key: string]: ContactTag[];
}

@StoreConfig({
    name: 'contact',
})
export class ContactStore extends EntityStore<ContactState> {
    constructor() {
        super();
    }
}

export const contactStore = new ContactStore();
