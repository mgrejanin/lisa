import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SellerPanelAuthGuard } from './authentication.guard';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { SellerPanelAuthService } from '../auth.service';
import { SellerPanelAuthServiceMock } from '../mocks/auth.service.mock';

describe('SellerPanelAuthGuard', () => {
    let guard: SellerPanelAuthGuard;
    let authService: SellerPanelAuthService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                SellerPanelAuthGuard,
                { provide: SellerPanelAuthService, useClass: SellerPanelAuthServiceMock },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
        });

        guard = TestBed.inject(SellerPanelAuthGuard);
        authService = TestBed.inject(SellerPanelAuthService);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should activate route when logged in', () => {
        const isLoggedSpy = spyOn(authService, 'isLogged').and.returnValue(true);
        const logoutSpy = spyOn(authService, 'logout');

        guard.canLoad();

        expect(guard.canLoad()).toBe(true);
        expect(isLoggedSpy).toHaveBeenCalled();
        expect(logoutSpy).not.toHaveBeenCalled();
    });

    it('should dont activate route when logged out', () => {
        const isLoggedSpy = spyOn(authService, 'isLogged');
        const logoutSpy = spyOn(authService, 'logout');

        guard.canLoad();

        expect(guard.canLoad()).toBe(false);
        expect(isLoggedSpy).toHaveBeenCalled();
        expect(logoutSpy).toHaveBeenCalled();
    });
});
