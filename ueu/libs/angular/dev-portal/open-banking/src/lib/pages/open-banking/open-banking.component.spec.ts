import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MockModule } from 'ng-mocks';

import { SharedTrackEventsDirectivesModule } from '@picpay/angular/shared/track-events';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule, UiQuery, UiStore } from '@picpay/dev-portal/shared';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { TimelineComponent } from '../../components/timeline/timeline.component';
import { OpenBankingComponent } from './open-banking.component';

describe('OpenBankingComponent', () => {
    let component: OpenBankingComponent;
    let fixture: ComponentFixture<OpenBankingComponent>;
    let store: UiStore;
    let query: UiQuery;

    const coreDataAccessServiceStub = {
        getConfig: jest.fn().mockReturnValue({
            apiUrl: 'api.com',
            release: 'qa',
            apiKey: '123',
            isProd: false,
        }),
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [OpenBankingComponent, TimelineComponent],
            imports: [
                MockModule(DesignSystemAngularModule),
                MockModule(DevPortalSharedModule),
                MockModule(SharedTrackEventsDirectivesModule),
                RouterTestingModule.withRoutes([]),
            ],
            providers: [
                {
                    provide: CoreDataAccessService,
                    useValue: coreDataAccessServiceStub,
                },
                UiStore,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OpenBankingComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(UiStore);
        query = TestBed.inject(UiQuery);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call handle redirect when button has click', () => {
        fixture.detectChanges();
        const spy = spyOn(component, 'handleRedirect');
        const buttonElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('.page__btn-doc');

        buttonElement.click();

        expect(spy).toHaveBeenCalled();
    });
    it('should redirect to internal doc when config is qa', () => {
        const router = TestBed.inject<Router>(Router);
        const routerSpy = spyOn(router, 'navigate');
        const internalDoc = '/docs/pix';
        fixture.detectChanges();

        component.handleRedirect();

        expect(routerSpy).toHaveBeenCalledWith([internalDoc]);
    });
    it('should redirect to external doc when config is prod', () => {
        const externalDoc =
            'https://openbanking-brasil.github.io/areadesenvolvedor/#em-revisao-pix-criar-iniciacao-de-pagamento';
        coreDataAccessServiceStub.getConfig.mockReturnValue({
            apiUrl: 'api.com',
            release: 'prod',
            apiKey: '123',
            isProd: true,
        });
        const routerSpy = spyOn(window, 'open');
        fixture.detectChanges();

        component.handleRedirect();

        expect(routerSpy).toHaveBeenCalledWith(externalDoc);
    });
    it('should have a prop isMobile as true', done => {
        let isMobile: boolean;
        store.updateIsMobile(true);
        query.isMobile$.subscribe(value => {
            isMobile = value;
            done();
        });
        expect(isMobile).toBe(true);
    });

    it('should have a prop isMobile as false', done => {
        let isMobile: boolean;
        store.updateIsMobile(false);
        query.isMobile$.subscribe(value => {
            isMobile = value;
            done();
        });
        expect(isMobile).toBe(false);
    });
});
