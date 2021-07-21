import { BookmarksQuery } from './bookmarks.query';
import { BookmarksStore } from './bookmarks.store';

describe('BookmarksQuery', () => {
    let query: BookmarksQuery;

    beforeEach(() => {
        query = new BookmarksQuery(new BookmarksStore());
    });

    it('should create an instance', () => {
        expect(query).toBeTruthy();
    });

    it('should have isLoading$ observable', () => {
        expect(query.isLoading$).toBeDefined();
    });

    it('should have bookmarks$ observable', () => {
        expect(query.bookmarks$).toBeDefined();
    });
});
