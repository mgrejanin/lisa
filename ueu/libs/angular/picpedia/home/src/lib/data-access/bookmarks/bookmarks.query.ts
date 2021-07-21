import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Bookmark } from '../../models';
import { BookmarksState, BookmarksStore } from './bookmarks.store';

@Injectable({ providedIn: 'root' })
export class BookmarksQuery extends Query<BookmarksState> {
    readonly isLoading$: Observable<boolean>;
    readonly bookmarks$: Observable<Bookmark[]>;

    constructor(protected store: BookmarksStore) {
        super(store);
        this.isLoading$ = this.selectLoading();
        this.bookmarks$ = this.select('bookmarks');
    }
}
