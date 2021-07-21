import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// store components
import { FeaturesService } from './features.service';
import { FeaturesStore } from './features.store';

// interfaces
import { Router } from '@angular/router';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { FeatureType, Application, FeatureAuditing, UpdateFeatureParams, Feature, FeatureCreate } from '../../models';

// services
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

describe('FeaturesService', () => {
    let featuresService: FeaturesService;
    let featuresStore: FeaturesStore;

    let configService: CoreDataAccessService;

    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FeaturesService,
                FeaturesStore,
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

        featuresService = TestBed.inject(FeaturesService);
        featuresStore = TestBed.inject(FeaturesStore);

        configService = TestBed.inject(CoreDataAccessService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(featuresService).toBeDefined();
    });

    it('should have a getFeature function', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/flags/features/mockId`;
        const storeSpy = spyOn(featuresStore, 'updateActiveFeature');

        featuresService.getFeature('mockId');

        const request = httpMock.expectOne(expectedUrl);
        request.flush(null);

        expect(request.request.method).toBe('GET');
        expect(storeSpy).toHaveBeenCalledWith(null);
    });

    it('should have a getFeatures function', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/flags/features`;
        const setFeaturesSpy = spyOn(featuresStore, 'updateFeatures');
        const setActiveSpy = spyOn(featuresStore, 'updateActiveFeature');

        const mockFeatures = [
            new Feature(
                'mockName',
                'mockDescription',
                FeatureType.BOOLEAN,
                'false',
                { name: 'mockAppName', id: 'mockAppId' },
                { name: 'mockSquadName', id: 'mockSquadId' },
                'mockId',
                [],
                [],
                'mockDate',
                'mockDate',
            ),
        ];

        featuresService.getFeatures();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockFeatures);

        expect(request.request.method).toBe('GET');
        expect(setFeaturesSpy).toHaveBeenCalledWith(mockFeatures);
        expect(setActiveSpy).toHaveBeenCalledWith(mockFeatures[0]);
    });

    it('should have a createFeature function', () => {
        const notifications = TestBed.inject(NotificationsService);
        const notificationsSpy = spyOn(notifications, 'openSnackbar');

        const router = TestBed.inject(Router);
        const navSpy = spyOn(router, 'navigate');

        const expectedUrl = `${configService.getConfig().apiUrl}/flags/features`;
        const getspy = spyOn(featuresService, 'getFeatures');

        const mockFeature = new FeatureCreate(
            'mockName',
            'mockDescription',
            FeatureType.BOOLEAN,
            'false',
            'mockAppId',
            'mockId',
            [],
        );

        featuresService.createFeature(mockFeature);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(null);

        expect(request.request.method).toBe('POST');
        expect(notificationsSpy).toHaveBeenCalledWith('Funcionalidade criada com sucesso.');
        expect(getspy).toHaveBeenCalledTimes(1);
        expect(navSpy).toHaveBeenCalledWith(['../']);
    });

    it('should have a updateFeature function', () => {
        const mockFeature = new Feature(
            'mockName',
            'mockDescription',
            FeatureType.BOOLEAN,
            'false',
            { name: 'mockAppName', id: 'mockAppId' },
            { name: 'mockSquadName', id: 'mockSquadId' },
            'mockId',
            [],
            [],
            'mockDate',
            'mockDate',
        );
        const mockParams = new UpdateFeatureParams('mockDescription', 'false', 'mockMessage', []);

        const notifications = TestBed.inject(NotificationsService);
        const notificationsSpy = spyOn(notifications, 'openSnackbar');

        const router = TestBed.inject(Router);
        const navSpy = spyOn(router, 'navigate');

        const expectedUrl = `${configService.getConfig().apiUrl}/flags/features/${mockFeature.id}`;
        const getspy = spyOn(featuresService, 'getFeatures');

        featuresService.updateFeature(mockFeature.id, mockParams);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(null);

        expect(request.request.method).toBe('PUT');
        expect(notificationsSpy).toHaveBeenCalledWith('Funcionalidade editada com sucesso.');
        expect(getspy).toHaveBeenCalledTimes(1);
        expect(navSpy).toHaveBeenCalledWith(['../']);
    });

    it('should have a deleteFeature function', () => {
        const notifications = TestBed.inject(NotificationsService);
        const notificationsSpy = spyOn(notifications, 'openSnackbar');

        const mockId = 'mockId';

        const expectedUrl = `${configService.getConfig().apiUrl}/flags/features/${mockId}`;
        const getspy = spyOn(featuresService, 'getFeatures');

        featuresService.deleteFeature(mockId);

        const request = httpMock.expectOne(expectedUrl);
        request.flush(null);

        expect(request.request.method).toBe('DELETE');
        expect(notificationsSpy).toHaveBeenCalledWith('Funcionalidade excluída com sucesso.');
        expect(getspy).toHaveBeenCalledTimes(1);
    });

    it('should have a getCommits function', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/flags/features/mockId/commits`;
        const setCommitsSpy = spyOn(featuresStore, 'updateActiveCommits');

        featuresService.getCommits('mockId');

        const mockCommits = [new FeatureAuditing('mockId', 'mockMessage', 'mockCreatedAt', 1, 'mockTime', null)];

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockCommits);

        expect(request.request.method).toBe('GET');
        expect(setCommitsSpy).toHaveBeenCalledWith(mockCommits);
    });

    it('should have a getApplications function', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/flags/applications`;
        const updateApplicationsSpy = spyOn(featuresStore, 'updateApplications');

        featuresService.getApplications();

        const mockApplications = [new Application('mockId', 'mockName')];

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockApplications);

        expect(request.request.method).toBe('GET');
        expect(updateApplicationsSpy).toHaveBeenCalledWith(mockApplications);
    });

    it('should have a getSquads function', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/flags/users/squads`;
        const updateSquadsSpy = spyOn(featuresStore, 'updateSquads');

        featuresService.getSquads();

        const mockSquads = [{ id: 'mockId', name: 'mockName' }];

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockSquads);

        expect(request.request.method).toBe('GET');
        expect(updateSquadsSpy).toHaveBeenCalledWith(mockSquads);
    });

    it('should have a getClientGroups function', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/flags/client-groups?app=PicPayVerdinho`;
        const updateClientGroupsSpy = spyOn(featuresStore, 'updateClientGroups');

        featuresService.getClientGroups('PicPayVerdinho');

        const mockClientGroups = [{ id: 'mockId', name: 'mockName', app: 'mockApp' }];

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockClientGroups);

        expect(request.request.method).toBe('GET');
        expect(updateClientGroupsSpy).toHaveBeenCalledWith(mockClientGroups);
    });

    it('should have a getTypeName function', () => {
        let name: string;

        name = featuresService.getTypeName(FeatureType.BOOLEAN);
        expect(name).toBe('Boolean');

        name = featuresService.getTypeName(FeatureType.JSON);
        expect(name).toBe('Json');

        name = featuresService.getTypeName(FeatureType.STRING);
        expect(name).toBe('String');

        name = featuresService.getTypeName(null);
        expect(name).toBe('Undefined');
    });

    it('should have ngOnDestroy', () => {
        featuresService.ngOnDestroy();
    });
});
