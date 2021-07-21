import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { credentialsMock, projectMock, secretMock } from '../../mocks';

import { CredentialsService } from './credentials.service';

describe('CredentialsService', () => {
    let service: CredentialsService;
    let configService: CoreDataAccessService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                CredentialsService,
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'credentials.com' }),
                    },
                },
            ],
        });

        service = TestBed.inject(CredentialsService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have getInfoCredential function with credentials (Success Case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/gatekeeper/b2p-credentials`;

        service.getInfoCredential().subscribe(() => done());

        const credentialsRequest = httpMock.expectOne(url);

        credentialsRequest.flush(credentialsMock);

        expect(credentialsRequest.request.method).toBe('GET');
    });

    it('should have getInfoCredential function (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/gatekeeper/b2p-credentials`;
        let statusCode: number;

        service.getInfoCredential().subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const credentialsRequest = httpMock.expectOne(url);

        credentialsRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'not found' });

        expect(credentialsRequest.request.method).toBe('GET');
        expect(statusCode).toBe(404);
    });

    it('should have getClientSecret function with client_secret (Success Case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/gatekeeper/client-secret/30168b8f-8db0-41a2-b29d-da8a0776054a`;
        const client_id = '30168b8f-8db0-41a2-b29d-da8a0776054a';

        service.getClientSecret(client_id).subscribe(() => done());

        const secretRequest = httpMock.expectOne(url);
        secretRequest.flush(secretMock);

        expect(secretRequest.request.method).toBe('GET');
    });

    it('should have getClientSecret function with client_secret (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/gatekeeper/client-secret/30168b8f-8db0-41a2-b29d-da8a0776054a`;
        const client_id = '30168b8f-8db0-41a2-b29d-da8a0776054a';
        let statusCode: number;

        service.getClientSecret(client_id).subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const secretRequest = httpMock.expectOne(url);

        secretRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'not found' });

        expect(secretRequest.request.method).toBe('GET');
        expect(statusCode).toBe(404);
    });

    it('should have updateClientSecret function (Success Case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/gatekeeper/client-secret/30168b8f-8db0-41a2-b29d-da8a0776054a`;
        const client_id = '30168b8f-8db0-41a2-b29d-da8a0776054a';

        service.updateClientSecret(client_id).subscribe(() => done());

        const secretRequest = httpMock.expectOne(url);
        secretRequest.flush(secretMock);

        expect(secretRequest.request.method).toBe('PUT');
    });

    it('should have updateClientSecret function (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/gatekeeper/client-secret/30168b8f-8db0-41a2-b29d-da8a0776054a`;
        const client_id = '30168b8f-8db0-41a2-b29d-da8a0776054a';
        let statusCode: number;

        service.updateClientSecret(client_id).subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const secretRequest = httpMock.expectOne(url);

        secretRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'not found' });

        expect(secretRequest.request.method).toBe('PUT');
        expect(statusCode).toBe(404);
    });

    it('should have saveProjectCredential function (Success Case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/gatekeeper/b2p-credentials`;

        service.saveProjectCredential(projectMock).subscribe(() => done());

        const projectCredentialRequest = httpMock.expectOne(url);

        projectCredentialRequest.flush(projectMock);

        expect(projectCredentialRequest.request.method).toBe('POST');
        expect(projectCredentialRequest.request.body).toEqual(projectMock);
        expect(projectCredentialRequest.request.responseType).toBe('json');
    });

    it('should have saveProjectCredential function (Error case)', (done: jest.DoneCallback) => {
        const url = `${configService.getConfig().apiUrl}/gatekeeper/b2p-credentials`;
        let statusCode: number;

        service.saveProjectCredential(projectMock).subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const secretRequest = httpMock.expectOne(url);

        secretRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'not found' });

        expect(secretRequest.request.method).toBe('POST');
        expect(statusCode).toBe(404);
    });

    it('should have disableCredential function (Success Case)', (done: jest.DoneCallback) => {
        const url = `${
            configService.getConfig().apiUrl
        }/gatekeeper/disable-credential/30168b8f-8db0-41a2-b29d-da8a0776054a`;
        const client_id = '30168b8f-8db0-41a2-b29d-da8a0776054a';

        service.disableCredential(client_id).subscribe(() => done());

        const disableCredentialRequest = httpMock.expectOne(url);

        disableCredentialRequest.flush('');

        expect(disableCredentialRequest.request.method).toBe('PUT');
        expect(disableCredentialRequest.request.body).toEqual('');
        expect(disableCredentialRequest.request.responseType).toBe('json');
    });

    it('should have disableCredential function (Error case)', (done: jest.DoneCallback) => {
        const url = `${
            configService.getConfig().apiUrl
        }/gatekeeper/disable-credential/30168b8f-8db0-41a2-b29d-da8a0776054a`;
        const client_id = '30168b8f-8db0-41a2-b29d-da8a0776054a';
        let statusCode: number;

        service.disableCredential(client_id).subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const secretRequest = httpMock.expectOne(url);

        secretRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'not found' });

        expect(secretRequest.request.method).toBe('PUT');
        expect(statusCode).toBe(404);
    });

    it('should have enableCredential function (Success Case)', (done: jest.DoneCallback) => {
        const url = `${
            configService.getConfig().apiUrl
        }/gatekeeper/enable-credential/30168b8f-8db0-41a2-b29d-da8a0776054a`;
        const client_id = '30168b8f-8db0-41a2-b29d-da8a0776054a';

        service.enableCredential(client_id).subscribe(() => done());

        const disableCredentialRequest = httpMock.expectOne(url);

        disableCredentialRequest.flush('');

        expect(disableCredentialRequest.request.method).toBe('PUT');
        expect(disableCredentialRequest.request.body).toEqual('');
        expect(disableCredentialRequest.request.responseType).toBe('json');
    });

    it('should have enableCredential function (Error case)', (done: jest.DoneCallback) => {
        const url = `${
            configService.getConfig().apiUrl
        }/gatekeeper/enable-credential/30168b8f-8db0-41a2-b29d-da8a0776054a`;
        const client_id = '30168b8f-8db0-41a2-b29d-da8a0776054a';
        let statusCode: number;

        service.enableCredential(client_id).subscribe(
            () => {
                done();
            },
            err => {
                statusCode = err.status;
                done();
            },
        );

        const secretRequest = httpMock.expectOne(url);

        secretRequest.error(new ErrorEvent('unauthorized'), { status: 404, statusText: 'not found' });

        expect(secretRequest.request.method).toBe('PUT');
        expect(statusCode).toBe(404);
    });
});
