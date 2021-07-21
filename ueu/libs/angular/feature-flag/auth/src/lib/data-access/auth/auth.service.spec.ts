// angular-testing
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

// store-components
import { AuthService } from './auth.service';
import { AuthStore } from './auth.store';

// data-access
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { AuthStoreMock } from './mocks/auth.store.mock';

// interfaces
import { AuthUser, AuthUserRoles, FeatureFlagPermissions } from '../../models';

// modules
import { RouterTestingModule } from '@angular/router/testing';

//keycloak
import {
    keycloakConfigMock,
    KeycloakServiceMock,
    PicpayKeycloakConfigService,
    PicpayKeycloakService,
} from '@picpay/keycloak';

describe('AuthService', () => {
    let authService: AuthService;
    let authStore: AuthStore;
    let picpayKeycloakService: PicpayKeycloakService;
    let configService: CoreDataAccessService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                PicpayKeycloakService,
                { provide: AuthStore, useClass: AuthStoreMock },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'testUrl' }),
                    },
                },
                { provide: PicpayKeycloakConfigService, useValue: keycloakConfigMock },
                { provide: PicpayKeycloakService, useValue: new KeycloakServiceMock(true, []) },
            ],
            imports: [HttpClientTestingModule, RouterTestingModule],
        });

        authService = TestBed.inject(AuthService);
        authStore = TestBed.inject(AuthStore);
        picpayKeycloakService = TestBed.inject(PicpayKeycloakService);
        configService = TestBed.inject(CoreDataAccessService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(authService).toBeDefined();
        expect(picpayKeycloakService).toBeDefined();
    });

    it('should have getProfile function', () => {
        const mockResponse: AuthUser = {
            id: 'mockId',
            name: 'mockName',
            picture: 'mockPicture',
            fullname: 'mockFullname',
            email: 'mockEmail',
            roles: { isAdmin: false, isEditor: true, adminSquad: ['FeatureManagement'], editorSquad: [] },
        };

        const expectedUrl = `${configService.getConfig().apiUrl}/flags/users/me`;
        const updateSpy = jest.spyOn(authStore, 'update');

        authService.getProfile().subscribe();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(mockResponse);

        expect(request.request.method).toBe('GET');
        expect(updateSpy).toHaveBeenCalledWith({ user: mockResponse });

        httpMock.verify();
    });

    /* Logout function test case */
    it('should have logout function', () => {
        const storeSpy = spyOn(authStore, 'reset');
        const keycloakServiceSpy = spyOn(picpayKeycloakService, 'logout');

        authService.logout();

        expect(storeSpy).toHaveBeenCalled();
        expect(keycloakServiceSpy).toHaveBeenCalled();
    });

    /* updateRedirectUrl test case */
    it('should have updateRedirectUrl function', () => {
        const spy = spyOn(authStore, 'updateRedirectUrl');
        const testUrl = '/test';

        authService.updateRedirectUrl(testUrl);

        expect(spy).toHaveBeenCalledWith(testUrl);
    });

    /* hasPermissions test cases */
    it('should have hasPermissions function (globalAdmin - success case)', () => {
        const mockUserRoles: AuthUserRoles = {
            isAdmin: true,
            isEditor: false,
            adminSquad: [],
            editorSquad: [],
        };

        const mockRoutePermissions: FeatureFlagPermissions = new FeatureFlagPermissions(true, false, [], []);

        const result = authService.hasPermissions(mockUserRoles, mockRoutePermissions);

        expect(result).toBe(true);
    });

    it('should have hasPermissions function (globalAdmin - error case)', () => {
        const mockUserRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: false,
            adminSquad: [],
            editorSquad: [],
        };

        const mockRoutePermissions: FeatureFlagPermissions = new FeatureFlagPermissions(true, false, [], []);

        const result = authService.hasPermissions(mockUserRoles, mockRoutePermissions);

        expect(result).toBe(false);
    });

    it('should have hasPermissions function (globalEditor - success case)', () => {
        const mockUserRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: true,
            adminSquad: [],
            editorSquad: [],
        };

        const mockRoutePermissions: FeatureFlagPermissions = new FeatureFlagPermissions(true, true, [], []);

        const result = authService.hasPermissions(mockUserRoles, mockRoutePermissions);

        expect(result).toBe(true);
    });

    it('should have hasPermissions function (globalEditor - error case)', () => {
        const mockUserRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: false,
            adminSquad: [],
            editorSquad: [],
        };

        const mockRoutePermissions: FeatureFlagPermissions = new FeatureFlagPermissions(false, true, [], []);

        const result = authService.hasPermissions(mockUserRoles, mockRoutePermissions);

        expect(result).toBe(false);
    });

    it('should have hasPermissions function (globalAdmin - error case)', () => {
        const mockUserRoles: AuthUserRoles = {
            isAdmin: true,
            isEditor: false,
            adminSquad: [],
            editorSquad: [],
        };

        const mockRoutePermissions: FeatureFlagPermissions = new FeatureFlagPermissions(false, true, [], []);

        const result = authService.hasPermissions(mockUserRoles, mockRoutePermissions);
        expect(result).toBe(false);
    });

    it('should have hasPermissions function (globalEditor - error case)', () => {
        const mockUserRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: true,
            adminSquad: [],
            editorSquad: [],
        };

        const mockRoutePermissions: FeatureFlagPermissions = new FeatureFlagPermissions(true, false, [], []);

        const result = authService.hasPermissions(mockUserRoles, mockRoutePermissions);
        expect(result).toBe(false);
    });

    it('should have hasPermissions function (squadAdmin - success case)', () => {
        const mockUserRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: false,
            adminSquad: ['mockSquadId'],
            editorSquad: [],
        };

        const mockRoutePermissions: FeatureFlagPermissions = new FeatureFlagPermissions(
            false,
            false,
            ['mockSquadId'],
            [],
        );

        const result = authService.hasPermissions(mockUserRoles, mockRoutePermissions);

        expect(result).toBe(true);
    });

    it('should have hasPermissions function (squadAdmin - error case)', () => {
        const mockUserRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: false,
            adminSquad: ['mockSquadId'],
            editorSquad: [],
        };

        const mockRoutePermissions: FeatureFlagPermissions = new FeatureFlagPermissions(
            false,
            false,
            ['anotherMockSquadId'],
            [],
        );

        const result = authService.hasPermissions(mockUserRoles, mockRoutePermissions);

        expect(result).toBe(false);
    });

    it('should have hasPermissions function (squadEditor - success case)', () => {
        const mockUserRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: false,
            adminSquad: [],
            editorSquad: ['mockSquadId'],
        };

        const mockRoutePermissions: FeatureFlagPermissions = new FeatureFlagPermissions(
            false,
            false,
            [],
            ['mockSquadId'],
        );

        const result = authService.hasPermissions(mockUserRoles, mockRoutePermissions);

        expect(result).toBe(true);
    });

    it('should have hasPermissions function (squadEditor - error case)', () => {
        const mockUserRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: false,
            adminSquad: [],
            editorSquad: ['mockSquadId'],
        };

        const mockRoutePermissions: FeatureFlagPermissions = new FeatureFlagPermissions(
            false,
            false,
            [],
            ['anotherMockSquadId'],
        );

        const result = authService.hasPermissions(mockUserRoles, mockRoutePermissions);

        expect(result).toBe(false);
    });

    /* isAdmin test cases */
    it('should have isAdmin function (globalAdmin - success case)', () => {
        const mockGlobalAdminRoles: AuthUserRoles = {
            isAdmin: true,
            isEditor: false,
            adminSquad: [],
            editorSquad: [],
        };

        const result = authService.isAdmin(mockGlobalAdminRoles);

        expect(result).toBe(true);
    });

    it('should have isAdmin function (squad admin - success case)', () => {
        const mockRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: false,
            adminSquad: ['mockSquadId'],
            editorSquad: [],
        };

        const result = authService.isAdmin(mockRoles);

        expect(result).toBe(true);
    });

    it('should have isAdmin function (globalAdmin && squadAdmin - success case)', () => {
        const mockGlobalAdminRoles: AuthUserRoles = {
            isAdmin: true,
            isEditor: false,
            adminSquad: ['mockSquadId'],
            editorSquad: [],
        };

        const result = authService.isAdmin(mockGlobalAdminRoles);

        expect(result).toBe(true);
    });

    it('should have isAdmin function (not admin - error case)', () => {
        const mockRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: false,
            adminSquad: [],
            editorSquad: [],
        };

        const result = authService.isAdmin(mockRoles);

        expect(result).toBe(false);
    });

    /* isEditor test cases */
    it('should have isEditor function (globalEditor - success case)', () => {
        const mockGlobalAdminRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: true,
            adminSquad: [],
            editorSquad: [],
        };

        const result = authService.isEditor(mockGlobalAdminRoles);

        expect(result).toBe(true);
    });

    it('should have isEditor function (squad editor - success case)', () => {
        const mockRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: false,
            adminSquad: [],
            editorSquad: ['mockSquadId'],
        };

        const result = authService.isEditor(mockRoles);

        expect(result).toBe(true);
    });

    it('should have isEditor function (globalEditor && squadEditor - success case)', () => {
        const mockGlobalAdminRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: true,
            adminSquad: [],
            editorSquad: ['mockSquadId'],
        };

        const result = authService.isEditor(mockGlobalAdminRoles);

        expect(result).toBe(true);
    });

    it('should have isEditor function (not editor - error case)', () => {
        const mockRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: false,
            adminSquad: [],
            editorSquad: [],
        };

        const result = authService.isEditor(mockRoles);

        expect(result).toBe(false);
    });

    it('should always return false for unmatching and invalid cases', () => {
        const mockRoles: AuthUserRoles = {
            isAdmin: false,
            isEditor: false,
            adminSquad: ['mockSquadId'],
            editorSquad: ['anotherMockSquadId'],
        };

        const mockRoutePermissions: FeatureFlagPermissions = new FeatureFlagPermissions(
            true,
            true,
            ['mockSquadId'],
            ['anotherMockSquadId'],
            true,
            true,
        );

        const case1 = authService.hasPermissions(mockRoles, undefined);
        const case2 = authService.hasPermissions(undefined, mockRoutePermissions);
        const case3 = authService.isAdmin(undefined);
        const case4 = authService.isSquadAdmin(undefined);
        const case5 = authService.isEditor(undefined);
        const case6 = authService.isSquadEditor(undefined);

        expect(case1).toEqual(false);
        expect(case2).toEqual(false);
        expect(case3).toEqual(false);
        expect(case4).toEqual(false);
        expect(case5).toEqual(false);
        expect(case6).toEqual(false);
    });
});
