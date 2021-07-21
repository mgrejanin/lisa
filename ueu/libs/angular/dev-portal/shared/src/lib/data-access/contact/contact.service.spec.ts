import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// store components
import { ContactService } from './contact.service';
import { ContactStore } from './contact.store';

// interfaces
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

// services
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { DevPortalDataAccessConfig } from '../dev-portal-data-access.config';
import { ContactTagResponse } from '../../models';

describe('ContactService', () => {
    let contactService: ContactService;
    let contactStore: ContactStore;

    let configService: CoreDataAccessService<DevPortalDataAccessConfig>;

    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ContactService,
                ContactStore,
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

        contactService = TestBed.inject(ContactService);
        contactStore = TestBed.inject(ContactStore);

        configService = TestBed.inject(CoreDataAccessService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(contactService).toBeDefined();
    });

    it('should have a getTags function', () => {
        const typeTags = 'external';
        const expectedUrl = `${configService.getConfig().apiUrl}/external/v1/contacts/tags?type=${typeTags}`;
        const storeSpy = spyOn(contactStore, 'updateTags');

        const tagResponse: ContactTagResponse = {
            message: 'msg',
            data: {
                b2p: [
                    {
                        subject: 'sub',
                        tag: 'tag',
                    },
                ],
            },
        };

        contactService.getTags(typeTags);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(tagResponse);

        expect(request.request.method).toBe('GET');
        expect(storeSpy).toHaveBeenCalled();
    });
});
