import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { BookmarksService } from './bookmarks.service';
import { BookmarksState, BookmarksStore } from './bookmarks.store';
import { mockBookmarks } from './mocks/bookmarks.mock';

describe('BookmarksService', () => {
    let bookmarksService: BookmarksService;
    let bookmarksStore: BookmarksStore;
    let configService: CoreDataAccessService;
    let apiUrl: string;
    let httpMock: HttpTestingController;
    let mockBookmarkState: BookmarksState;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BookmarksService,
                BookmarksStore,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
            imports: [HttpClientTestingModule],
        });

        bookmarksService = TestBed.inject(BookmarksService);
        bookmarksStore = TestBed.inject(BookmarksStore);
        configService = TestBed.inject(CoreDataAccessService);
        apiUrl = configService.getConfig().apiUrl;
        httpMock = TestBed.inject(HttpTestingController);
        mockBookmarkState = { bookmarks: mockBookmarks };
    });

    it('should be created', () => {
        expect(bookmarksService).toBeDefined();
        expect(bookmarksStore).toBeDefined();
    });

    it('should have getBookmarks function', () => {
        const expectedUrl = `${apiUrl}/metadata/v0/user/bookmark`;

        bookmarksService.getBookmarks();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBookmarkState);

        expect(request.request.method).toBe('GET');
    });

    it('should call update and setIsLoading from store on getBookmarks function', () => {
        const expectedUrl = `${apiUrl}/metadata/v0/user/bookmark`;
        const updateSpy = spyOn(bookmarksStore, 'update');
        const setIsLoadingSpy = spyOn(bookmarksStore, 'setLoading');

        bookmarksService.getBookmarks();
        expect(setIsLoadingSpy).toHaveBeenLastCalledWith(true);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockBookmarkState);

        expect(updateSpy).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenLastCalledWith(mockBookmarkState);
        expect(setIsLoadingSpy).toHaveBeenLastCalledWith(false);
        expect(setIsLoadingSpy).toHaveBeenCalledTimes(2);
    });
});
