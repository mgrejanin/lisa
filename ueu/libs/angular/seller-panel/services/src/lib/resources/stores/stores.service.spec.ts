import { TestBed } from '@angular/core/testing';
import { SellerAccessConfig } from './../../config/seller-access.config';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { StoresService } from './stores.service';

describe('StoresService', () => {
    let storesService: StoresService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService<SellerAccessConfig>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                StoresService,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'stores.com' }),
                    },
                },
            ],
        });

        configService = TestBed.inject(CoreDataAccessService);
        storesService = TestBed.inject(StoresService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(storesService).toBeTruthy();
    });

    it('should have getStores function', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/v2/transactions/store-filters`;

        storesService.getStores().subscribe(() => done());

        const storesRequest = httpMock.expectOne(url);

        storesRequest.flush([
            {
                id: '123456',
                name: 'Telessena',
                checked: true,
            },
            {
                id: '123457',
                name: 'Ultragaz',
                checked: false,
            },
        ]);

        expect(storesRequest.request.method).toBe('GET');
    });
});
