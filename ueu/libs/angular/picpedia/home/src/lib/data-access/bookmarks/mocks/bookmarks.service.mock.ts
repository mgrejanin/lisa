import { Observable, of } from 'rxjs';

import { Bookmark } from '../../../models';
import { mockBookmarks } from './bookmarks.mock';

export class BookmarksServiceMock {
    getBookmarks(): Observable<Bookmark[]> {
        return of(mockBookmarks);
    }
}
