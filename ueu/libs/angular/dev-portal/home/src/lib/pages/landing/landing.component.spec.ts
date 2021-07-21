import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';
import { MockModule } from 'ng-mocks';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import {
    DevPortalSharedModule,
    Panel,
    Product,
    ProductsService,
    ProductsServiceMock,
    ProductsStore,
    UiService,
} from '@picpay/dev-portal/shared';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

// Event Tracking
import { EventTracking } from '@picpay/event-tracking';
import { SharedTrackEventsModule } from '@picpay/angular/shared/track-events';

import { LandingComponent } from './landing.component';
import { PicpayKeycloakConfig, PicpayKeycloakModule } from '@picpay/keycloak';

describe('LandingComponent', () => {
    let component: LandingComponent;
    let fixture: ComponentFixture<LandingComponent>;
    let productService: ProductsService;
    let productsStore: ProductsStore;

    const keycloakConfig: PicpayKeycloakConfig = {
        clientId: 'test_dev-portal',
        realm: 'dev-portal',
        url: 'http://test.com/auth/',
        onLoad: 'check-sso',
        withCallback: true,
        notAllowedRouteRedirectTo: '/',
    };

    const productsMock: Product[] = [
        {
            id: 1,
            category: 'Webhook',
            name: 'Assinaturas',
            slug: 'assinaturas',
            description: 'Lorem Ipsum.',
            panel_url: null,
            documentations: [
                {
                    id: 1,
                    type: 'external',
                    environment: 'qa',
                    url: 'http://membership.ms.qa/v1/docs/webhooks',
                },
                {
                    id: 2,
                    type: 'internal',
                    environment: 'qa',
                    url: 'http://membership.ms.qa/v1/docs/api',
                },
                {
                    id: 3,
                    type: 'external',
                    environment: 'production',
                    url: 'http://membership.ms.prod/v1/docs/webhooks',
                },
                {
                    id: 4,
                    type: 'internal',
                    environment: 'production',
                    url: 'http://membership.ms.prod/v1/docs/api',
                },
            ],
        },
        {
            id: 2,
            category: 'Custom API',
            name: 'B2P',
            slug: 'b2p',
            description: 'Lorem Ipsum.',
            panel_url: 'https://lojista.picpay.com/login',
            documentations: [
                {
                    id: 1,
                    type: 'external',
                    environment: 'production',
                    url: 'http://example.com/',
                },
            ],
        },
        {
            id: 3,
            category: 'Plug and Play',
            name: 'E-commerce',
            slug: 'e-commerce',
            description: 'Lorem Ipsum.',
            panel_url: 'https://ecommerce.picpay.com/',
            documentations: [
                {
                    id: 1,
                    type: 'external',
                    environment: 'production',
                    url: 'http://example.com/',
                },
            ],
        },
    ];

    const panelMock: Panel[] = [
        { name: 'Painel Lojista', description: 'Lorem Ipsum', url: 'https://lojista.picpay.com/login' },
        { name: 'Painel E-commerce', description: 'Lorem Ipsum', url: 'https://ecommerce.picpay.com/' },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LandingComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                SharedTrackEventsModule.forRoot(),
                MockModule(DesignSystemAngularModule),
                MatDialogModule,
                HttpClientTestingModule,
                DevPortalSharedModule,
                PicpayKeycloakModule.forRoot(keycloakConfig),
            ],
            providers: [
                { provide: UiService, useValue: false },
                { provide: ProductsService, useClass: ProductsServiceMock },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingComponent);
        component = fixture.componentInstance;
        productService = TestBed.inject(ProductsService);
        productsStore = TestBed.inject(ProductsStore);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the service getProducts when the products are loaded', () => {
        const productSpy = spyOn(productService, 'getProducts').and.returnValue(of(productsMock));

        productService.getProducts();
        expect(productSpy).toBeCalled();
    });

    it('should call the service getPanels when the products are loaded', () => {
        const productSpy = spyOn(productService, 'getPanels').and.returnValue(of(panelMock));

        productService.getPanels();
        expect(productSpy).toBeCalled();
    });

    it('should display no products card', () => {
        fixture.detectChanges();
        const noMessageElement = fixture.debugElement.query(By.css('.card'));
        expect(noMessageElement).toBeNull();
    });

    it('should display three products card', () => {
        productsStore.updateProducts(productsMock);
        fixture.detectChanges();
        const todos = fixture.debugElement.queryAll(By.css('.card'));
        expect(todos.length).toEqual(3);
    });

    it('should display no panels', () => {
        fixture.detectChanges();
        const noMessageElement = fixture.debugElement.query(By.css('.panel'));
        expect(noMessageElement).toBeNull();
    });

    it('should display two panels', () => {
        productsStore.updatePanels(panelMock);
        fixture.detectChanges();
        const todos = fixture.debugElement.queryAll(By.css('.panel'));
        expect(todos.length).toEqual(2);
    });

    it('should be colorPanel', () => {
        enum ColorPanel {
            'Painel Lojista' = '#349DCE',
            'Painel E-commerce' = '',
            'Assinaturas' = '#26cc98',
        }
        expect(component.colorPanel).toEqual(ColorPanel);
    });

    it('should be destroyed', () => {
        expect(component.ngOnDestroy).toBeDefined();
        component.ngOnDestroy();
    });

    it('should have call eventTracking function', () => {
        const evtTracking = spyOn(EventTracking, 'track');
        const btn_name = 'HEADER';
        const ctx = 'B2P';
        const page_name = '';
        component.eventTracking(btn_name, ctx);

        expect(evtTracking).toHaveBeenCalledWith('Button Clicked', {
            button_name: `BOTAO_${btn_name}_${ctx}`,
            page_name: `STUDIO_PICPAY${page_name}`,
            context: ctx,
        });
    });

    it('should have to convertToSlug function', () => {
        const slug = component.convertToSlug('painel lojista');
        expect(slug).toEqual('painel-lojista');
    });
});
