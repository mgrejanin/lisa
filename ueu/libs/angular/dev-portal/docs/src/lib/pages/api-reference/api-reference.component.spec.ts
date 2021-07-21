import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpyLocation } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import {
    DevPortalSharedModule,
    Product,
    ProductsQuery,
    ProductsService,
    ProductsStore,
} from '@picpay/dev-portal/shared';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { ApiReferenceComponent } from './api-reference.component';
import { AssinaturasComponent } from '../products/assinaturas/assinaturas.component';
import { B2pComponent } from '../products/b2p/b2p.component';
import { ECommerceComponent } from '../products/e-commerce/e-commerce.component';
import { OpenPlatformComponent } from '../products/open-platform/open-platform.component';
import { SwaggerScrollComponent } from '../../components/swagger-scroll/swagger-scroll.component';

// Event Tracking
import { SharedTrackEventsModule } from '@picpay/angular/shared/track-events';
import { MockModule } from 'ng-mocks';
import { PicpayKeycloakConfig, PicpayKeycloakModule, PicpayKeycloakService } from '@picpay/keycloak';

describe('ApiReferenceComponent', () => {
    let component: ApiReferenceComponent;
    let fixture: ComponentFixture<ApiReferenceComponent>;
    let service: ProductsService;
    let productsQuery: ProductsQuery;

    const keycloakConfig: PicpayKeycloakConfig = {
        clientId: 'test_dev-portal',
        realm: 'dev-portal',
        url: 'http://test.com/auth/',
        onLoad: 'check-sso',
        withCallback: true,
        notAllowedRouteRedirectTo: '/',
    };

    const mockDialog = {
        open: jasmine.createSpy('open'),
    };

    const producstMock: Product[] = [
        {
            id: 1,
            category: 'cat',
            name: 'name',
            description: 'desc',
            slug: 'slug',
            documentations: [
                {
                    id: 1,
                    type: 'external',
                    url: 'https://petstore.swagger.io/v2/swagger.json',
                    environment: 'qa',
                },
            ],
        },
        {
            id: 2,
            category: 'cat 2',
            name: 'name 2',
            description: 'desc 2',
            slug: 'slug2',
            documentations: [
                {
                    id: 1,
                    type: 'external',
                    url: 'url_wrong',
                    environment: 'production',
                },
            ],
        },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ApiReferenceComponent,
                SwaggerScrollComponent,
                ECommerceComponent,
                B2pComponent,
                AssinaturasComponent,
                OpenPlatformComponent,
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                SharedTrackEventsModule.forRoot(),
                PicpayKeycloakModule.forRoot(keycloakConfig),
                MockModule(DesignSystemAngularModule),
                MatDialogModule,
                HttpClientTestingModule,
                DevPortalSharedModule,
            ],
            providers: [
                ProductsStore,
                ProductsService,
                PicpayKeycloakService,
                { provide: MatDialog, useValue: mockDialog },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com', release: 'qa', apiKey: '123' }),
                    },
                },
                {
                    provide: Location,
                    useClass: SpyLocation,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApiReferenceComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(ProductsService);
        productsQuery = TestBed.inject(ProductsQuery);
        component.currentSlug = 'product-slug';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have activeProductApiUrl$ observable', () => {
        expect(component.activeProductApiUrl$).toBeDefined();
        expect(component.activeProductApiUrl$).toEqual(productsQuery.activeProductApiUrl$);
    });

    it('should call the service updateCurrentProduct when the products are loaded', () => {
        const productSpy = spyOn(service, 'getProducts').and.returnValue(of(producstMock));

        service.getProducts();
        expect(productSpy).toBeCalled();
    });

    it('should have an openDialog function', () => {
        fixture.detectChanges();
        component.openDialog();
        expect(mockDialog.open).toHaveBeenCalled();
    });

    it('should init swagger', () => {
        component.initateSwaggerComponent('http://test.com', '1234');
    });
});
