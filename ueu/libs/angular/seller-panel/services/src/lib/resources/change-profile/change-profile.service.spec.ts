import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { LocalStorageMock } from '@picpay/angular/shared/helpers';

import { ChangeProfileService } from './change-profile.service';
import { SellerAccessConfig } from '../../config';

describe('ChangeProfileService', () => {
    let sellerGroupService: ChangeProfileService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService<SellerAccessConfig>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                ChangeProfileService,
                {
                    provide: Storage,
                    useClass: LocalStorageMock,
                },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
        });

        configService = TestBed.inject(CoreDataAccessService);
        sellerGroupService = TestBed.inject(ChangeProfileService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should  be created', () => {
        expect(sellerGroupService).toBeTruthy();
    });

    it('should have getSellers function', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/user/original-login/seller/children`;

        sellerGroupService.getSellers().subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush([
            {
                id: '27',
                name: 'Supflex',
                cpf_cnpj: '11.969.129/0001-95',
            },
        ]);

        expect(request.request.method).toBe('GET');
    });

    it('should have changeSeller function', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/user/login/change`;

        sellerGroupService.changeSeller(123).subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual({ seller_id: 123 });
    });
});
