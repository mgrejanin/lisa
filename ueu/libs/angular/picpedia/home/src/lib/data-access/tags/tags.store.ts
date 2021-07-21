import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { Tag } from '../../models';

export interface TagsState {
    tags: Tag[];
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tags', resettable: true })
export class TagsStore extends EntityStore<TagsState> {
    constructor() {
        super({ tags: [] });
    }
}
