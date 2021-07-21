import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { of } from 'rxjs';

// store components
import { ProductsService } from './products.service';
import { ProductsStore } from './products.store';

// interfaces
import { Panel, Product, SwaggerDoc } from '../../models';

// services
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

// components
import { DevPortalDataAccessConfig } from '../dev-portal-data-access.config';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LogoComponent } from '../../components/logo/logo.component';
import { MockModule } from 'ng-mocks';
import { UiComponentsModule } from '@picpay/ui/components';

describe('ProductsService', () => {
    let productsService: ProductsService;
    let productsStore: ProductsStore;

    let configService: CoreDataAccessService<DevPortalDataAccessConfig>;
    let httpMock: HttpTestingController;

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

    const docMock: SwaggerDoc = {
        openapi: '3.0.0',
        info: {
            title: 'title',
            description: 'desc',
            contact: {
                email: 'mail',
            },
            version: '1.0.0',
        },
        paths: {
            '/path/endpoint': {
                path: 'path',
                post: {
                    tags: ['tags.1'],
                    summary: 'summary',
                    description: 'desc',
                    operationId: 'operationId',
                },
            },
        },
        components: {
            securitySchemes: {
                Authorization: {
                    type: 'apiKey',
                    description: 'desc',
                    name: 'name',
                    in: 'in',
                },
            },
        },
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductsService,
                ProductsStore,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com', release: 'qa' }),
                    },
                },
                { provide: NotificationsService, useValue: new MockNotificationsService(null) },
            ],
            imports: [
                UiComponentsModule,
                HttpClientTestingModule,
                RouterTestingModule.withRoutes([{ path: 'pagina-nao-encontrada', component: HeaderComponent }]),
                MockModule(DesignSystemAngularModule),
            ],
            declarations: [HeaderComponent, FooterComponent, LogoComponent],
        });

        productsService = TestBed.inject(ProductsService);
        productsStore = TestBed.inject(ProductsStore);

        configService = TestBed.inject(CoreDataAccessService);

        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(productsService).toBeDefined();
    });

    it('should have a getProducts function', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/external/v1/products?type=external`;
        const storeSpy = spyOn(productsStore, 'updateProducts');

        const productMock: Product[] = [
            {
                id: 1,
                category: 'cat',
                name: 'name',
                description: 'desc',
                slug: 'slug',
                documentations: [
                    {
                        id: 1,
                        type: 'type',
                        url: 'url',
                        environment: 'env',
                    },
                ],
            },
        ];

        productsService.getProducts();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(productMock);

        expect(request.request.method).toBe('GET');
        expect(storeSpy).toHaveBeenCalled();
    });

    it('should have a getPanels function', () => {
        const expectedUrl = `${configService.getConfig().apiUrl}/external/v1/panels`;
        const storeSpy = spyOn(productsStore, 'updatePanels');

        const panelsMock: Panel[] = [
            {
                name: 'Painel Lojista',
                description: 'Lorem Ipsum',
                url: 'https://lojista.picpay.com/login',
            },
            {
                name: 'Painel E-commerce',
                description: 'Lorem Ipsum',
                url: 'https://ecommerce.picpay.com/',
            },
        ];
        productsService.getPanels();

        const request = httpMock.expectOne(expectedUrl);
        request.flush(panelsMock);

        expect(request.request.method).toBe('GET');
        expect(storeSpy).toHaveBeenCalled();
    });

    it('should have an getDocJson function', () => {
        expect(productsService.getDocJson).toBeDefined();

        const spyService = spyOn(productsService, 'getDocJson').and.returnValue(of(docMock));

        productsService.getDocJson('https://teste.com');

        expect(spyService).toBeCalledTimes(1);
    });

    it('should have an updateCurrentProduct function', () => {
        expect(productsService.updateCurrentProduct).toBeDefined();
        const apiStore = spyOn(productsStore, 'updateApiUrl').and.returnValue(of('url'));

        // Not a product with a matching slug
        productsService.updateCurrentProduct('slug', []);
        expect(apiStore).toBeCalledTimes(0);

        // Product with a matching slug
        productsService.updateCurrentProduct('slug', producstMock);
        expect(apiStore).toBeCalledTimes(1);
    });

    it('should have an getCurrentProductDocUrl function', () => {
        expect(productsService.getCurrentProductDocUrl).toBeDefined();

        const expectedUrl = `${configService.getConfig().apiUrl}/external/v1/documentations/${
            producstMock[0].documentations[0].id
        }/content`;

        // Product with type external and environment qa
        const correctUrl = productsService.getCurrentProductDocUrl(producstMock[0]);

        // Product with type external and environment production
        const wrongUrl = productsService.getCurrentProductDocUrl(producstMock[1]);

        expect(correctUrl).toBe(expectedUrl);
        expect(wrongUrl).toBe('');
    });

    it('should unsubscribes when destoryed', () => {
        expect(productsService.ngOnDestroy).toBeDefined();
        productsService.ngOnDestroy();
    });
});
