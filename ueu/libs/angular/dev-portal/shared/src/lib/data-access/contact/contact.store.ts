import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ContactTagGroup } from '../../models';

export interface ContactState {
    tags: ContactTagGroup;
}

export function createInitialState(): ContactState {
    return {
        tags: null,
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'contact' })
export class ContactStore extends Store<ContactState> {
    constructor() {
        super(createInitialState());
    }

    updateTags(tags: ContactTagGroup) {
        this.update({ tags });
    }
}
