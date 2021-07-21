import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationRoutes } from '../../models/navigation.model';
import { StepperService } from '../../services/stepper/stepper.service';
import { StepperGuard } from './stepper.guard';
import { createMockRoute } from '../../helpers/testing';

describe('StepperGuard', () => {
    let guard: StepperGuard;
    let stepperService: StepperService;

    const navigationMock = { path: NavigationRoutes.Welcome, step: 0 };
    const routerMock = { url: '/form' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [StepperGuard],
        });
        guard = TestBed.inject(StepperGuard);
        stepperService = TestBed.inject(StepperService);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should have function canActivateChild', () => {
        expect(guard.canActivate).toBeTruthy();
    });
    it('should have function canActivateChild', () => {
        expect(guard.canActivateChild).toBeTruthy();
    });

    it('should call the canActivate', () => {
        const router = TestBed.inject<Router>(Router);
        const routerSpy = spyOn(router, 'navigate').and.callFake(() => {
            return {};
        });

        const route = createMockRoute(navigationMock) as ActivatedRouteSnapshot;
        const state = createMockRoute(routerMock) as RouterStateSnapshot;

        const stepperServiceSpy = spyOn(stepperService, 'authStep');

        guard.canActivate(route, state);

        expect(stepperServiceSpy).toHaveBeenCalledTimes(1);
        expect(routerSpy).not.toHaveBeenCalled();
    });

    it('should call the canActivateChild', () => {
        const guardSpy = spyOn(guard, 'canActivate');
        const route = createMockRoute(navigationMock) as ActivatedRouteSnapshot;
        const state = createMockRoute(routerMock) as RouterStateSnapshot;

        guard.canActivateChild(route, state);

        expect(guardSpy).toHaveBeenCalledTimes(1);
    });
});
