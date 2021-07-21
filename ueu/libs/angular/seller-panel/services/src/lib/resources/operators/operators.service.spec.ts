import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { SellerAccessConfig } from '../../config';
import { OperatorsService } from './operators.service';

describe('OperatorsService', () => {
    let operatorsService: OperatorsService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService<SellerAccessConfig>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                OperatorsService,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'operators.com' }),
                    },
                },
            ],
        });

        configService = TestBed.inject(CoreDataAccessService);
        operatorsService = TestBed.inject(OperatorsService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(operatorsService).toBeTruthy();
    });

    it('should have getOperators fucntion', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/user/operator?token_biz=aRgbhfE464f`;
        const token_biz = 'aRgbhfE464f';

        operatorsService.getOperators(token_biz).subscribe(() => done());

        const operatorsRequest = httpMock.expectOne(url);

        operatorsRequest.flush({
            meta: {
                code: 12345,
            },
            data: {
                list: [{ id: 1, username: 'José Henrique', checked: true }],
            },
        });

        expect(operatorsRequest.request.method).toBe('GET');
    });
});
