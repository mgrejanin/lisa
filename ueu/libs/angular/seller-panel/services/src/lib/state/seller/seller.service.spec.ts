import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { SellerAccessConfig } from '../../config/seller-access.config';
import { SellerService } from './seller.service';
import { SellerStore } from './seller.store';

describe('SellerService', () => {
    let sellerService: SellerService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService<SellerAccessConfig>;
    let sellerStore: SellerStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                SellerService,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
        });

        configService = TestBed.inject(CoreDataAccessService);
        sellerStore = TestBed.inject(SellerStore);
        sellerService = TestBed.inject(SellerService);

        sellerStore.update({
            organization: {
                id: 14643,
                name: 'Loja Rayssa',
                razaoSocial: 'Rayssa Mayara Barbosa Silva',
                nomeFantasia: 'Loja Rayssa',
                image: '/assets/images/avatar.svg',
                cpfCnpj: '35521886000101',
                email: 'testerayssa@gmail.com',
                type: 'biz',
                pessoaFisica: true,
                phone: '11952936114',
            },
            ecommerce: null,
            responsible: {
                cpf: '',
                name: '',
                birthDate: '0000-00-00',
                motherName: null,
                phone: '11300000003',
            },
            plan: {
                id: 14558,
                name: 'Personalizado',
                daysToWithdrawal: 1,
                fee: 4.89,
            },
            user: {
                id: '001',
                name: 'test name',
                cpf: '00000000011',
            },
            hasBranch: false,
        });

        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(sellerService).toBeTruthy();
    });

    it('should have setSellerData function', () => {
        const storeUpdateSpy = spyOn(sellerStore, 'update');

        sellerService.setSellerData({});

        expect(storeUpdateSpy).toHaveBeenCalledWith({});
    });

    it('should have clearSellerData function', () => {
        const storeResetSpy = spyOn(sellerStore, 'reset');

        sellerService.clearSellerData();

        expect(storeResetSpy).toHaveBeenCalled();
    });

    it('should have refreshSellerData function', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/user/details`;
        const storeUpdateSpy = spyOn(sellerStore, 'update');

        sellerService.refreshSellerData();

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('GET');
        expect(storeUpdateSpy).toHaveBeenCalled();
    });

    it('should have getOrganizationDocument function', () => {
        expect(sellerService.getOrganizationDocument()).toEqual('35521886000101');
    });

    it('should have editDetails function', (done: jest.DoneCallback) => {
        const expectedUrl = `test.com/user/details`;

        sellerService.editDetails().subscribe(() => {
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush(null);

        expect(request.request.method).toBe('PATCH');
    });

    it('should have finishOnboard function', (done: jest.DoneCallback) => {
        const expectedUrl = `test.com/onboard/finish`;

        sellerService.finishOnboard().subscribe(() => {
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('POST');
    });
});
