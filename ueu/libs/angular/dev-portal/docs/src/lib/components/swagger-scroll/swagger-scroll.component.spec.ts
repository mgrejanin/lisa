import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpyLocation } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of, throwError } from 'rxjs';
import { MockModule } from 'ng-mocks';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { DevPortalSharedModule, Endpoint, ProductsService, SwaggerDoc } from '@picpay/dev-portal/shared';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { EndpointGroup } from '../../models/endpoint-group.model';

import { SwaggerScrollComponent } from './swagger-scroll.component';

describe('SwaggerScrollComponent', () => {
    let component: SwaggerScrollComponent;
    let fixture: ComponentFixture<SwaggerScrollComponent>;
    let productService: ProductsService;

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

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                DevPortalSharedModule,
                RouterTestingModule,
                MockModule(DesignSystemAngularModule),
                HttpClientTestingModule,
            ],
            declarations: [SwaggerScrollComponent],
            providers: [
                ProductsService,
                {
                    provide: Location,
                    useClass: SpyLocation,
                },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com', release: 'qa' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SwaggerScrollComponent);

        productService = TestBed.inject(ProductsService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a mapEndpointTags function', () => {
        expect(component.mapEndpointTags).toBeDefined();

        const tag = 'tags.1';

        component.mapEndpointTags(tag);
        fixture.detectChanges();
        expect(component.tags.indexOf(tag)).toBeGreaterThan(-1);
    });

    it('should have a generateAnchorLink function', () => {
        expect(component.generateAnchorLink).toBeDefined();

        const endpointWithId: Endpoint = {
            tags: ['tags.1'],
            summary: 'summary',
            description: 'desc',
            operationId: 'operationId',
            method: 'post',
            path: '/path/endpoint',
            tag: 'tags.1',
        };

        const endpointWithoutId: Endpoint = {
            tags: ['tags.1'],
            summary: 'summary',
            description: 'desc',
            method: 'post',
            path: '/path/endpoint',
            tag: 'tags.1',
        };

        const slugWithOperationId = component.generateAnchorLink(endpointWithId);
        const slugWithoutOperationId = component.generateAnchorLink(endpointWithoutId);

        expect(slugWithOperationId).toBe('operations-tags\\.1-operationId');
        expect(slugWithoutOperationId).toBe('operations-tags\\.1-post_path_endpoint');
    });

    it('should have a normalizeStringPeriods function', () => {
        expect(component.normalizeStringPeriods).toBeDefined();

        const string = component.normalizeStringPeriods('tags.method');

        expect(string).toBe('tags\\.method');
    });

    it('should navigate back when onBackHandler is called', () => {
        spyOn(component.location, 'back');
        component.onBackHandler();
        expect(component.onBackHandler).toBeDefined();
        expect(component.location.back).toHaveBeenCalledTimes(1);
    });

    it('should have a scrollToElement function', () => {
        const el: HTMLElement = document.getElementById('swagger-scroll');
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
        expect(el).toBeDefined();
        expect(component.scrollToElement).toBeDefined();
        component.scrollToElement('swagger-scroll');
    });

    it('should have a loadApiJson function', () => {
        expect(component.loadApiJson).toBeDefined();
        const fakeJsonUrl = 'http://fake.com';
        const spyService = spyOn(productService, 'getDocJson').and.returnValue(of(docMock));
        const expectedResult = [
            {
                tag: 'tags.1',
                endpoints: [
                    {
                        tag: 'tags.1',
                        path: '/path/endpoint',
                        method: 'post',
                        tags: ['tags.1'],
                        summary: 'summary',
                        description: 'desc',
                        operationId: 'operationId',
                    },
                ],
            },
        ];

        // Should not try to load the api
        component.loadApiJson(null);
        expect(spyService).toBeCalledTimes(0);

        // Should load the api
        component.loadApiJson(fakeJsonUrl);
        expect(spyService).toBeCalledTimes(1);
        expect(component.isLoading).toBeFalsy();
        expect(component.endpointGroup).toStrictEqual(expectedResult);
    });

    it('should have a error on loadApiJson function', () => {
        expect(component.loadApiJson).toBeDefined();
        const fakeJsonUrl = 'http://fake.com';
        const spyService = spyOn(productService, 'getDocJson').and.returnValue(throwError({ status: 401 }));
        component.endpointGroup = [];

        // Should not try to load the api
        component.loadApiJson(null);
        expect(spyService).toBeCalledTimes(0);

        // Should load the api
        component.loadApiJson(fakeJsonUrl);
        expect(spyService).toBeCalledTimes(1);
        expect(component.isLoading).toBeTruthy();
        expect(component.endpointGroup).toEqual([]);
    });

    it('should get the endpoints grouped by tag when parseDocumentationObject is called', () => {
        const group: EndpointGroup[] = component.parseDocumentationObject(docMock);
        fixture.detectChanges();
        const expectedResult: EndpointGroup[] = [
            {
                tag: 'tags.1',
                endpoints: [
                    {
                        tags: ['tags.1'],
                        summary: 'summary',
                        description: 'desc',
                        operationId: 'operationId',
                        method: 'post',
                        path: '/path/endpoint',
                        tag: 'tags.1',
                    },
                ],
            },
        ];
        expect(group).toStrictEqual(expectedResult);
    });
});
