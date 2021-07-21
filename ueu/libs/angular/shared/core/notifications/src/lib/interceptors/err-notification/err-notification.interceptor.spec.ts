import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

// interceptor
import { ErrNotificationInterceptor } from './err-notification.interceptor';

// services
import { NotificationsService } from '../../services/notifications/notifications.service';

// mocks
import { MockNotificationsService } from '../../services/notifications/notifications.service.mock';
import { SnackbarTypes } from '../../models';

describe('ErrNotificationInterceptor', () => {
    let interceptor: ErrNotificationInterceptor;
    let notificationsService: NotificationsService;

    let http: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ErrNotificationInterceptor,
                { provide: NotificationsService, useValue: new MockNotificationsService('any') },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrNotificationInterceptor,
                    multi: true,
                },
            ],
        });

        interceptor = TestBed.inject(ErrNotificationInterceptor);
        notificationsService = TestBed.inject(NotificationsService);
        http = TestBed.inject(HttpClient);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should not call notifications service on HttpResponse', (done: jest.DoneCallback) => {
        const notificationSpy = spyOn(notificationsService, 'openSnackbar');

        http.get('/testEndpoint').subscribe(() => {
            done();
        });

        const request = httpMock.expectOne('/testEndpoint');

        request.flush({});

        expect(notificationSpy).not.toHaveBeenCalled();
    });

    it('should call notifications service on HttpErrorResponse (with error message)', (done: jest.DoneCallback) => {
        const notificationSpy = spyOn(notificationsService, 'openSnackbar').and.callThrough();

        http.get('/testEndpoint').subscribe(
            () => {
                done();
            },
            () => {
                done();
            },
        );

        const request = httpMock.expectOne('/testEndpoint');

        const mockMessage = 'mockErrorMessage';

        const mockError = new ErrorEvent('mock', { message: mockMessage });

        request.error(mockError);

        expect(notificationSpy).toHaveBeenCalledWith(mockMessage, SnackbarTypes.ERROR);
    });

    it('should call notifications service on HttpErrorResponse (without error message)', (done: jest.DoneCallback) => {
        const notificationSpy = spyOn(notificationsService, 'openSnackbar').and.callThrough();

        http.get('/testEndpoint').subscribe(
            () => {
                done();
            },
            () => {
                done();
            },
        );

        const request = httpMock.expectOne('/testEndpoint');

        const mockError = new ErrorEvent('mock');

        request.error(mockError);

        expect(notificationSpy).toHaveBeenCalledWith(
            'Ops! Ocorreu um erro inesperado ao processar a sua solicitação.',
            SnackbarTypes.ERROR,
        );
    });
});
