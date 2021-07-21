import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

// data-access
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

import { Service } from '../../models/services.model';
import { Variable } from '../../models/variable.model';
import { VariablesGet } from '../../models/variables-get.model';
import { VariablesRequest } from '../../models/variables-request.model';
import { VariableType } from '../../models/variables-type.model';
import { VariablesUpdate } from '../../models/variables-update.model';
import { VariablesService } from './variables.service';
import { VariablesStore } from './variables.store';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

describe('VariablesService', () => {
    let service: VariablesService;
    let dataAcessService: CoreDataAccessService;
    let httpMock: HttpTestingController;
    let store: VariablesStore;

    const mockDialog = {
        closeAll: jasmine.createSpy('closeAll'),
    };

    beforeEach(() => {
        const httpErrorResponseStub = () => ({
            error: { message: {} },
            status: {},
            message: {},
        });

        store = new VariablesStore();

        TestBed.configureTestingModule({
            providers: [
                VariablesService,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'testApiUrl' }),
                    },
                },
                { provide: HttpErrorResponse, useFactory: httpErrorResponseStub },
                { provide: NotificationsService, useValue: new MockNotificationsService(null) },
                { provide: MatDialog, useValue: mockDialog },
            ],
            imports: [HttpClientTestingModule, MatDialogModule],
        });

        service = TestBed.inject(VariablesService);
        dataAcessService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(store).toBeTruthy();
    });

    it('should have setEnvironment function', () => {
        const mockEnvironment = 'mock';
        service.setEnvironment(mockEnvironment);
    });

    it('should have setTotalItems function', () => {
        const mockTotalItems = 0;
        service.setTotalItems(mockTotalItems);
    });

    it('should have setServices function', () => {
        const mockService = [new Service('mockService', 'mockKey', 'mockAlias', 'mockStage')];
        service.setAssociatedServices(mockService);
    });

    it('should have setPageIndex function', () => {
        const mockPageIndex = 0;
        service.setPageIndex(mockPageIndex);
    });

    it('should have setActiveVariableKey function', () => {
        const mockActive = 'mock';
        service.setActiveVariableKey(mockActive);
    });

    it('should have setValueVariableSecret function', () => {
        const mockValueSecret = 'mock';
        service.setValueVariableSecret(mockValueSecret);
    });

    it('should have setValueVariable function', () => {
        const mockValue = 'mock';
        service.setValueVariable(mockValue);
    });

    it('should have setTypeVariable function', () => {
        const mockType = 'mock';
        service.setTypeVariable(mockType);
    });

    it('should have getVariables function, query option', () => {
        const page = '0';
        const size = 10;
        const query = 'mockQuery';
        const mockVariables = new VariablesGet([], 10);
        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars?query=${query}&page=${page}&size=${size}`;

        service.getVariables(size, query);

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('GET');
    });

    it('should have getVariables function', () => {
        const page = '0';
        const size = 10;
        const mockVariables = new VariablesGet([], 10);
        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars?page=${page}&size=${size}`;

        service.getVariables(size);

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('GET');
    });

    it('should have getVariableServicesByKey function', () => {
        const mockKey = 'mock';
        const mockServices = [new Service('mockService', 'mockKey', 'mockAlias', 'mockStage')];
        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${mockKey}/services`;

        service.getVariableServicesByKey(mockKey);

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockServices]);

        expect(request.request.method).toBe('GET');
    });

    it('should have getVariableKey function', (done: jest.DoneCallback) => {
        const mockVariables = new VariablesUpdate('testValue', VariableType.PLAIN);
        const key = 'mock';

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}`;
        const expectedResponse = [mockVariables];

        let response: VariablesUpdate;

        service.getVariableKey(key).subscribe(resp => {
            response = resp;
            done();
        });

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('GET');
        expect(response).toEqual(expectedResponse);
    });

    it('should have getVariableVersion function', () => {
        const mockVariables = new Variable('testKey', 'testValue', VariableType.PLAIN, 'id', 1, 'testCreated');
        const key = 'mock';
        const version = 1;

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}/${version}`;
        service.getVariableVersion(key, version);

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);
        expect(request.request.method).toBe('GET');
    });

    it('should have createVariable function', () => {
        const mockVariables = new VariablesRequest('testKey');
        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars`;

        service.createVariable(mockVariables);
        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(mockVariables);
    });

    it('should have updateVariable function', () => {
        const mockVariables = new Variable('testKey', 'testValue', VariableType.PLAIN, 'id', 1, 'testCreated');
        const parameters: VariablesUpdate = {
            value: 'testValue',
            type: VariableType.PLAIN,
        };
        const key = 'mock';

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}`;
        service.updateVariable(key, parameters);

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('POST');
        expect(request.request.body).toEqual(parameters);
    });

    it('should have deleteVariable function', () => {
        const mockVariables = new Variable('testKey', 'testValue', VariableType.PLAIN, 'id', 1, 'testCreated');
        const key = 'mock';
        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}`;

        service.deleteVariable(key);

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('DELETE');
    });

    it('should have showValueVariableSecret function', () => {
        const mockVariables = new Variable('testKey', 'testValue', VariableType.PLAIN, 'id', 1, 'testCreated');
        const key = 'mock';
        const version = 1;

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}/${version}/decrypt`;
        service.showValueVariableSecret(key, version);

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('GET');
    });

    it('should have rollbackVariable function', () => {
        const mockVariables = new Variable('testKey', 'testValue', VariableType.PLAIN, 'id', 1, 'testCreated');
        const parameters: VariablesUpdate = {
            value: 'testValue',
            type: VariableType.PLAIN,
        };
        const key = 'mock';
        const version = 1;

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/env-vars/${key}/${version}/rollback`;
        service.rollbackVariable(key, version, parameters);

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('PUT');
    });

    it('should have associateService function', () => {
        const mockVariables = new Service('testService', 'testKey', 'testAlias', 'testStage');
        const parameters: Service = {
            service: 'testService',
            key: 'testKey',
            alias: 'testAlias',
            stage: 'testStage',
        };
        const param = 'mock';

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/services/${param}/env-vars`;
        service.associateService(param, parameters);

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('PUT');
        expect(request.request.body).toEqual(parameters);
    });

    it('should have desassociateService function', () => {
        const mockVariables = new Service('testService', 'testKey', 'testAlias', 'testStage');
        const paramService = 'mockService';
        const paramkey = 'mockKey';

        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/services/${paramService}/env-vars/${paramkey}`;
        service.desassociateService(paramService, paramkey);

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);
        expect(request.request.method).toBe('DELETE');
    });

    it('should have getServiceSearch function', () => {
        const mockVariables = new Service('testService', 'testKey', 'testAlias', 'testStage');
        const paramService = 'mockService';
        const expectedUrl = `${dataAcessService.getConfig().apiUrl}/services/${paramService}/env-vars`;

        service.getServiceSearch(paramService);

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('GET');
    });

    it('should have deployService function', () => {
        const mockVariables = new Service('testService', 'testKey', 'testAlias', 'testStage');
        const paramStage = 'qa';
        const paramService = 'mockService';
        const expectedUrl = `${
            dataAcessService.getConfig().apiUrl
        }/env-vars/deploy?stage=${paramStage}&services=${paramService}`;

        service.deployService(paramService);

        const request = httpMock.expectOne(expectedUrl);
        request.flush([mockVariables]);

        expect(request.request.method).toBe('PUT');
    });
});
