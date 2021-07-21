import { Observable, of } from 'rxjs';

import { Bookmark } from '../../../models';
import { mockBookmarks } from './bookmarks.mock';

export class BookmarksQueryMock {
    isLoading$: Observable<boolean>;
    bookmarks$: Observable<Bookmark[]>;

    constructor() {
        this.isLoading$ = of(false);
        this.bookmarks$ = of(mockBookmarks);
    }
}
