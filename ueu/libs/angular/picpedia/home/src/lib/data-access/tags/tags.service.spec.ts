import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { mockTags } from './mocks/tags.mock';
import { TagsService } from './tags.service';
import { TagsState, TagsStore } from './tags.store';

describe('TagsService', () => {
    let tagsService: TagsService;
    let tagsStore: TagsStore;
    let configService: CoreDataAccessService;
    let apiUrl: string;
    let httpMock: HttpTestingController;
    let mockTagsState: TagsState;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TagsService,
                TagsStore,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
            imports: [HttpClientTestingModule],
        });

        configService = TestBed.inject(CoreDataAccessService);
        tagsService = TestBed.inject(TagsService);
        tagsStore = TestBed.inject(TagsStore);
        apiUrl = configService.getConfig().apiUrl;
        httpMock = TestBed.inject(HttpTestingController);
        mockTagsState = { tags: mockTags };
    });

    it('should be created', () => {
        expect(tagsService).toBeDefined();
        expect(tagsStore).toBeDefined();
    });

    it('should have getTags function', () => {
        const expectedUrl = `${apiUrl}/metadata/v0/tags`;

        tagsService.getTags();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockTagsState);

        expect(request.request.method).toBe('GET');
    });

    it('should call update and setIsLoading from store on getTags function', () => {
        const expectedUrl = `${apiUrl}/metadata/v0/tags`;
        const updateSpy = spyOn(tagsStore, 'update');
        const setIsLoadingSpy = spyOn(tagsStore, 'setLoading');

        tagsService.getTags();
        expect(setIsLoadingSpy).toHaveBeenLastCalledWith(true);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockTagsState);

        expect(updateSpy).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenLastCalledWith(mockTagsState);
        expect(setIsLoadingSpy).toHaveBeenLastCalledWith(false);
        expect(setIsLoadingSpy).toHaveBeenCalledTimes(2);
    });
});
