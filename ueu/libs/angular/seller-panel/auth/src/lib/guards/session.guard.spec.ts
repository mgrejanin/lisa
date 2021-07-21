import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SellerService, SellerServiceMock } from '@picpay/seller-panel/services';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { LocalStorageMock } from '@picpay/angular/shared/helpers';

import { SellerPanelAuthService } from '../auth.service';
import { SellerPanelAuthServiceMock } from '../mocks/auth.service.mock';
import { SellerPanelSessionGuard } from './session.guard';

describe('SellerPanelSessionGuard', () => {
    let guard: SellerPanelSessionGuard;
    let authService: SellerPanelAuthService;
    let sellerService: SellerService;
    let localStorageMock: LocalStorageMock;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                SellerPanelSessionGuard,
                { provide: SellerPanelAuthService, useClass: SellerPanelAuthServiceMock },
                { provide: SellerService, useClass: SellerServiceMock },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
        });

        guard = TestBed.inject(SellerPanelSessionGuard);
        authService = TestBed.inject(SellerPanelAuthService);
        sellerService = TestBed.inject(SellerService);
        localStorageMock = new LocalStorageMock();
        router = TestBed.inject(Router);

        spyOn(localStorage, 'clear').and.callFake(localStorageMock.clear);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should redirect to /login when logged out', () => {
        const isLoggedSpy = spyOn(authService, 'isLogged').and.returnValue(false);
        const clearSellerDataSpy = spyOn(sellerService, 'clearSellerData');

        guard.canLoad();

        expect(isLoggedSpy).toHaveBeenCalled();
        expect(clearSellerDataSpy).toHaveBeenCalled();
        expect(guard.canLoad()).toBe(true);
    });

    it('should dont redirect to /inicio route when logged in', () => {
        const isLoggedSpy = spyOn(authService, 'isLogged').and.returnValue(true);
        const routerSpy = spyOn(router, 'parseUrl');

        guard.canLoad();

        expect(isLoggedSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalled();
    });
});
