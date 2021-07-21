import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ShipmentService } from './shipment.service';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { batchMock, saveBatchShipmentMock } from '../../mocks';

describe('ShipmentService', () => {
    let service: ShipmentService;
    let configService: CoreDataAccessService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                ShipmentService,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'shipment.com' }),
                    },
                },
            ],
        });
        service = TestBed.inject(ShipmentService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have saveBatchShipment function (Success case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/b2p/batch`;

        service.saveBatchShipment(batchMock).subscribe(() => done());

        const batchShipmentRequest = httpMock.expectOne(url);

        batchShipmentRequest.flush(saveBatchShipmentMock);

        const formData = new FormData();
        formData.append('name', batchMock.name);
        formData.append('file', batchMock.file);
        formData.append('end_date', batchMock.end_date.toISOString().split('T')[0]);
        formData.append('withdrawable', batchMock.withdrawable ? '1' : '0');

        expect(batchShipmentRequest.request.method).toBe('POST');
        expect(batchShipmentRequest.request.body).toEqual(formData);
        expect(batchShipmentRequest.request.responseType).toBe('json');
    });

    it('should have saveBatchShipment function (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/b2p/batch`;
        let statusCode: number;

        service.saveBatchShipment(batchMock).subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const batchShipmentRequest = httpMock.expectOne(url);

        batchShipmentRequest.error(new ErrorEvent('unauthorized'), { status: 401, statusText: 'unauthorized' });

        expect(batchShipmentRequest.request.method).toBe('POST');
        expect(statusCode).toBe(401);
    });
});
