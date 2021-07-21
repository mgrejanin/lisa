import { BookmarksState, BookmarksStore } from './bookmarks.store';
import { mockBookmarks } from './mocks/bookmarks.mock';

describe('BookmarksStore', () => {
    let store: BookmarksStore;
    let mockBookmarksState: BookmarksState;

    beforeEach(() => {
        store = new BookmarksStore();
        mockBookmarksState = { bookmarks: mockBookmarks };
    });

    it('should create an instance', () => {
        expect(store).toBeTruthy();
    });

    it('should have update function', () => {
        const updateSpy = spyOn(store, 'update');
        store.update(mockBookmarksState);
        expect(updateSpy).toHaveBeenCalledWith<[BookmarksState]>(mockBookmarksState);
    });
});
