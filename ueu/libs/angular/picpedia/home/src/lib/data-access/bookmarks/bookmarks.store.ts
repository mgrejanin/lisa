import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

import { Bookmark } from '../../models';

export interface BookmarksState {
    bookmarks: Bookmark[];
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'bookmarks', resettable: true })
export class BookmarksStore extends EntityStore<BookmarksState> {
    constructor() {
        super({ bookmarks: [] });
    }
}
