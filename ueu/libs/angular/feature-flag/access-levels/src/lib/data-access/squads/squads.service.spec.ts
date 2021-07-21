import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

// @picpay
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

// interfaces
import { Squad } from '../../models';

// store components
import { SquadsService, SquadsStore } from '.';

describe('SquadsService', () => {
    let squadsService: SquadsService;
    let squadsStore: SquadsStore;

    let configService: CoreDataAccessService;

    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SquadsService,
                SquadsStore,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
            imports: [HttpClientTestingModule],
        });

        squadsService = TestBed.inject(SquadsService);
        squadsStore = TestBed.inject(SquadsStore);

        configService = TestBed.inject(CoreDataAccessService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(squadsService).toBeTruthy();
    });

    it('should have a getSquads function', () => {
        const setSpy = spyOn(squadsStore, 'set');

        const expectedUrl = `${configService.getConfig().apiUrl}/flags/users/squads/admin`;

        const mockSquads: Squad[] = [{ id: 'mockId', name: 'mockTitle' }];

        squadsService.getSquads();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockSquads);

        expect(request.request.method).toBe('GET');
        expect(setSpy).toHaveBeenCalledTimes(1);
        expect(setSpy).toHaveBeenCalledWith(mockSquads);
    });

    it('should have a updateFilter function', () => {
        const updateSpy = spyOn(squadsStore, 'update');
        const mockFilter = 'mockFilter';

        squadsService.updateFilter(mockFilter);

        expect(updateSpy).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenCalledWith({
            filter: mockFilter,
        });
    });

    it('should have a clearFilter function', () => {
        const updateSpy = spyOn(squadsStore, 'update');

        squadsService.clearFilter();

        expect(updateSpy).toHaveBeenCalledTimes(1);
    });
});
