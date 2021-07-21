import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// store components
import { RechargesService } from './recharges.service';
import { RechargesStore } from './recharges.store';

// interfaces
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

// services
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { mockRecharge, mockRechargeData } from './mocks/recharges.query.mock';
import { RechargeData, RechargeUpdate } from '../../models';

describe('FeaturesService', () => {
    let rechargesService: RechargesService;
    let rechargesStore: RechargesStore;

    let configService: CoreDataAccessService;

    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RechargesService,
                RechargesStore,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                { provide: NotificationsService, useValue: new MockNotificationsService(null) },
            ],
            imports: [HttpClientTestingModule, RouterTestingModule],
        });

        rechargesService = TestBed.inject(RechargesService);
        rechargesStore = TestBed.inject(RechargesStore);
        rechargesStore.updateRecharges(mockRechargeData);

        configService = TestBed.inject(CoreDataAccessService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(rechargesService).toBeDefined();
    });

    it('should have a getRecharges function without event and filter', () => {
        const event = {
            page: 1,
            pageSize: 10,
            sortBy: 'id_counter',
            sortOrder: 'DESC',
        };
        const filter = [{ show_name: 'Status', show_value: 'Aguardando', name: 'status_id', value: 'O' }];

        const params = new HttpParams()
            .set('page', event.page.toString())
            .set('page_size', event.pageSize.toString())
            .set('sortBy', event.sortBy)
            .set('sortOrder', event.sortOrder)
            .set('filters', JSON.stringify(filter));

        const expectedUrl = `${configService.getConfig().apiUrl}/recharges?${params}`;
        const setRechargesSpy = spyOn(rechargesStore, 'updateRecharges');

        rechargesService.getRecharges();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockRecharge);

        expect(request.request.method).toBe('GET');
        expect(setRechargesSpy).toHaveBeenCalledWith(mockRechargeData);
    });

    it('should have a updateRechargeValue function (Success)', (done: jest.DoneCallback) => {
        const updateRechargeSpy = spyOn(rechargesStore, 'updateRecharge');

        const rechargeUpdateRequestMock: Partial<RechargeData> = {
            id: '5fe1ecfda719fa46d62d38b2',
            value: 1000,
            value_srt: '100,000',
        };

        const rechargeUpdateResponseMock: Partial<RechargeUpdate> = {
            data: {
                bank_id: '',
                bank_statement_id: 0,
                comments: ['Recarga criada pelo motivo: teste'],
                consumer_id: 0,
                created_automatically: false,
                id_counter: 0,
                lock_completion: false,
                recharge_method_type_id: 0,
                request_date: '',
                status_id: '',
                updated_at: '',
                value: 1000,
                _id: '5fe1ecfda719fa46d62d38b2',
            },
        };

        const rechargeUpdateStoretMock: Partial<RechargeData> = {
            id: '5fe1ecfda719fa46d62d38b2',
            comments: ['Recarga criada pelo motivo: teste'],
            value: 1000,
            value_srt: '100,000',
        };

        const expectedUrl = `${configService.getConfig().apiUrl}/recharges/updateValue`;
        const { id, value } = rechargeUpdateRequestMock;

        rechargesService.updateRechargeValue(rechargeUpdateRequestMock).subscribe(
            () => {
                done();
            },
            () => done(),
        );

        const request = httpMock.expectOne(expectedUrl);
        request.flush(rechargeUpdateResponseMock);

        expect(request.request.method).toBe('PATCH');
        expect(request.request.body).toEqual({ id, value });
        expect(updateRechargeSpy).toHaveBeenCalledWith(rechargeUpdateStoretMock);
    });

    it('should have a updateRechargeValue function (Error)', (done: jest.DoneCallback) => {
        const updateRechargeSpy = spyOn(rechargesStore, 'updateRecharge');

        const expectedUrl = `${configService.getConfig().apiUrl}/recharges/updateValue`;

        rechargesService.updateRechargeValue({}).subscribe(
            () => {
                done();
            },
            () => done(),
        );

        const request = httpMock.expectOne(expectedUrl);
        request.error(new ErrorEvent('Error'));

        expect(request.request.method).toBe('PATCH');
        expect(updateRechargeSpy).not.toHaveBeenCalled();
    });
});
