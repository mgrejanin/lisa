import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

import { SellerAccessConfig } from '../../config';
import { ExtractService } from './extract.service';
import { B2PExtractProjects, ReportFormat, ReportRequest } from '../../models';
import { downloadExtractBlobSucess } from '../../mocks';

describe('ExtractService', () => {
    let extractService: ExtractService;
    let httpMock: HttpTestingController;
    let configService: CoreDataAccessService<SellerAccessConfig>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                ExtractService,
                {
                    provide: NotificationsService,
                    useValue: new MockNotificationsService({ confirmed: true }),
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
        extractService = TestBed.inject(ExtractService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(extractService).toBeTruthy();
    });

    it('should have getExtract function with default params', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/transactions/extract?page=0&per_page=10`;

        extractService.getExtract().subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('GET');
        expect(request.request.params.get('page')).toEqual('0');
        expect(request.request.params.get('per_page')).toEqual('10');
    });

    it('should have getExtract function with last_date param', (done: jest.DoneCallback) => {
        const expectedUrl = `${
            configService.getConfig().apiUrl
        }/v2/transactions/extract?page=2&per_page=10&last_date=2020-12`;

        extractService.getExtract(2, 10, '2020-12').subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('GET');
        expect(request.request.params.get('page')).toEqual('2');
        expect(request.request.params.get('per_page')).toEqual('10');
        expect(request.request.params.get('last_date')).toEqual('2020-12');
    });

    it('should have getWalletBalance function', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/transactions/wallet-balance`;

        extractService.getWalletBalance().subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('GET');
    });

    it('should have getFutureReleases function', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/transactions/next-movements`;

        extractService.getFutureReleases().subscribe(() => done());

        const request = httpMock.expectOne(expectedUrl);
        request.flush({});

        expect(request.request.method).toBe('GET');
    });

    it('should have exportExtract function sends to email', (done: jest.DoneCallback) => {
        const expectedUrl = `${
            configService.getConfig().apiUrl
        }/transactions/exportExtract?request_type=EMAIL&format_type=CSV&date_init=2020-12-03T00:00:00&date_end=2020-12-11T23:59:59`;
        const exportExtractParamsMock = {
            request_type: ReportRequest.EMAIL,
            format_type: ReportFormat.CSV,
            date_init: '2020-12-03T00:00:00',
            date_end: '2020-12-11T23:59:59',
        };

        extractService.exportExtract(exportExtractParamsMock).subscribe(() => {
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush({ email: 'testjest@jesttest.test' });

        expect(request.request.method).toBe('GET');
    });

    it('should have exportExtract function get export', () => {
        const expectedUrl = `${
            configService.getConfig().apiUrl
        }/transactions/exportExtract?request_type=EMAIL&format_type=CSV&date_init=2020-12-03T00:00:00&date_end=2020-12-11T23:59:59`;
        const exportExtractParamsMock = {
            request_type: ReportRequest.EMAIL,
            format_type: ReportFormat.CSV,
            date_init: '2020-12-03T00:00:00',
            date_end: '2020-12-11T23:59:59',
        };

        extractService.exportExtract(exportExtractParamsMock).subscribe();

        const request = httpMock.expectOne(expectedUrl);
        request.flush({ message: 'O download está sendo processado e será enviado por email.' });

        expect(request.request.method).toBe('GET');
    });

    it('should have getExtractProjects', (done: jest.DoneCallback) => {
        const expectedUrl = `${configService.getConfig().apiUrl}/b2p/projects`;
        const b2pProjectsMock: B2PExtractProjects[] = [
            {
                project_id: '606b7846f4a7cf198d528092',
                started_at: '2021-02-22T12:40:00.000000Z',
                ended_at: '2021-04-27T13:50:00.000000Z',
                name: 'Projeto Teste01',
                description: 'TESTE01:\n- Criar novo Projeto',
                updated_at: '2021-04-05T20:51:18.722000Z',
                created_at: '2021-04-05T20:51:18.722000Z',
            },
            {
                project_id: '60993ac1665112254c2372fe',

                started_at: '2021-03-22T12:40:00.000000Z',
                ended_at: '2021-05-27T13:50:00.000000Z',
                name: 'Projeto Teste02',
                description: 'TESTE02:\n- Criar novo Projeto',

                updated_at: '2021-05-10T20:51:18.722000Z',
                created_at: '2021-05-10T20:51:18.722000Z',
            },
        ];

        extractService.getExtractProjects().subscribe(() => done());

        const mockedRequest = httpMock.expectOne(expectedUrl);

        expect(mockedRequest.request.method).toBe('GET');
        expect(mockedRequest.cancelled).toBeFalsy();
        expect(mockedRequest.request.responseType).toBe('json');

        mockedRequest.flush(b2pProjectsMock);
    });

    it('should have downloadExtract', (done: jest.DoneCallback) => {
        const expectQueryParams = '?project_id=606b7846f4a7cf198d528092&start_date=2021/05/21&end_date=2021/06/21';
        const expectedUrl = `${configService.getConfig().apiUrl}/b2p/report${expectQueryParams}`;
        const downloadProjectMock = {
            projectId: '606b7846f4a7cf198d528092',
            startDate: '2021/05/21',
            endDate: '2021/06/21',
        };
        extractService
            .downloadExtract(downloadProjectMock.projectId, downloadProjectMock.startDate, downloadProjectMock.endDate)
            .subscribe(() => done());

        const mockedRequest = httpMock.expectOne(expectedUrl);

        expect(mockedRequest.request.method).toBe('GET');
        expect(mockedRequest.cancelled).toBeFalsy();
        expect(mockedRequest.request.responseType).toBe('blob');

        mockedRequest.flush(downloadExtractBlobSucess);
    });

    it('should have finishOnboarding void function', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/v2/hide-receivables-onboarding`;

        extractService.finishOnboarding();

        const request = httpMock.expectOne(expectedUrl);
        request.flush({ message: 'success' });

        expect(request.request.method).toBe('PUT');
    });
});
