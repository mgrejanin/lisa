import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SellerQuery } from '../../data-access';
import { StepperService } from './stepper.service';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { NavigationRoutes } from '../../models/navigation.model';
import { createMockRoute } from '../../helpers/testing';

describe('StepperService', () => {
    let service: StepperService;
    let sellerQuery: SellerQuery;
    let router: Router;

    const navigationMock = { path: NavigationRoutes.Welcome, step: 0 };
    const routerMock = { url: '/form' };

    const route = createMockRoute(navigationMock) as ActivatedRouteSnapshot;
    const state = createMockRoute(routerMock) as RouterStateSnapshot;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [StepperService],
        });
        service = TestBed.inject(StepperService);
        sellerQuery = TestBed.inject(SellerQuery);
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should have step$ observable', () => {
        expect(service['step$']).toBeDefined();
        expect(service['step$']).toEqual(sellerQuery.step$);
    });

    it('should have history variable', () => {
        expect(service['history']).toBeDefined();
    });

    it('should call the authStep', () => {
        expect(service.authStep(route, state)).toBeDefined();
        service.authStep(route, state);
    });

    it('should call the getLastStepUser', () => {
        expect(service.getLastStepUser).toBeDefined();
    });

    it('should call the loadRouting', () => {
        expect(service.loadRouting).toBeDefined();
    });

    it('should pass one router for guard ', (done: jest.DoneCallback) => {
        const routerSpy = spyOn(router, 'navigate').and.callFake(() => {
            return {};
        });

        Object.defineProperty(service, 'step$', { value: of(1) });

        service.authStep(route, state).subscribe(() => {
            expect(routerSpy).not.toHaveBeenCalled();
            done();
        });

        service['step$'].subscribe((value: number) => {
            expect(value).toEqual(1);

            expect(routerSpy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should pass router empty and history empty', (done: jest.DoneCallback) => {
        const navigationMock = {};
        const routerMock = {};

        const route = createMockRoute(navigationMock) as ActivatedRouteSnapshot;
        const state = createMockRoute(routerMock) as RouterStateSnapshot;

        service.authStep(route, state).subscribe(() => done());
    });
});
