import { MockComponents, MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { UserDropdownComponent } from '@picpay/ui/components';

import { BreadcrumbQuery, BreadcrumbsQueryMock, mockBreadcrumbs } from '../../data-access';
import { NavbarHeaderComponent } from './navbar-header.component';
import { getOriginalRoutePathUrlByReplacingParamValues } from '../../helpers';

import {
    keycloakConfigMock,
    KeycloakServiceMock,
    PicpayKeycloakConfigService,
    PicpayKeycloakService,
} from '@picpay/keycloak';
import { KeycloakService } from 'keycloak-angular';

describe('NavbarHeaderComponent', () => {
    let component: NavbarHeaderComponent;
    let fixture: ComponentFixture<NavbarHeaderComponent>;
    let breadcrumbQuery: BreadcrumbQuery;
    let keycloakService: KeycloakService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(DesignSystemAngularModule), MatButtonModule, RouterTestingModule.withRoutes([])],
            declarations: [NavbarHeaderComponent, MockComponents(MatIcon, UserDropdownComponent)],
            providers: [
                { provide: BreadcrumbQuery, useClass: BreadcrumbsQueryMock },
                { provide: PicpayKeycloakConfigService, useValue: keycloakConfigMock },
                { provide: KeycloakService, useValue: new KeycloakServiceMock(true, []) },
                PicpayKeycloakService,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        breadcrumbQuery = TestBed.inject(BreadcrumbQuery);
        keycloakService = TestBed.inject(KeycloakService);
        TestBed.inject(PicpayKeycloakService);
    });

    // Template
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have an action row', () => {
        const actionRow = fixture.debugElement.query(By.css('.c-navbar-header__actions-row'));
        expect(actionRow).toBeTruthy();
    });

    it('should have an title row', () => {
        const titleRow = fixture.debugElement.query(By.css('.c-navbar-header__title-row'));
        expect(titleRow).toBeTruthy();
    });

    it('should render return button if showReturnButton is true', () => {
        const returnButton = fixture.debugElement.query(By.css('.c-navbar-header__return-button'));
        expect(returnButton).toBeTruthy();
    });

    it('should render return button if showReturnButton is false', () => {
        const returnButton = fixture.debugElement.query(By.css('.c-navbar-header__return-button'));
        if (component.showReturnButton) {
            expect(returnButton).toBeTruthy();
        } else {
            expect(returnButton).toBeUndefined();
        }
    });

    it('should bind handleLogout to click action of logout button', () => {
        const logoutButton = fixture.debugElement.query(By.css('.c-user-dropdown__menu-button'));

        expect(logoutButton).not.toBeNull();

        const logoutSpy = spyOn(component, 'handleLogout');

        (logoutButton.nativeElement as HTMLButtonElement).click();

        expect(logoutSpy).toHaveBeenCalledTimes(1);
    });

    it('should not display breadcrumb (if it is not provided)', () => {
        component.showBreadcrumbs = false;
        fixture.detectChanges();
        const display = fixture.debugElement.query(By.css('.c-navbar-header__breadcrumb'));

        expect(display).toBeNull();
    });

    it('should display breadcrumb (if it is provided)', () => {
        component.showBreadcrumbs = true;
        fixture.detectChanges();
        const display = fixture.debugElement.query(By.css('.c-navbar-header__breadcrumb'));

        expect(display).not.toBeNull();
    });

    it('should display breadcrumb actived (if it is provided)', () => {
        component.breadcrumbs$ = of(mockBreadcrumbs);
        component.currentRouteUrlPath = mockBreadcrumbs[0].url;
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-navbar-header__breadcrumb-active'));
        expect(display).not.toBeNull();
        expect(display.nativeElement.textContent).toBe(mockBreadcrumbs[0].label);
    });

    it('should not display breadcrumb actived (if it is not provided)', () => {
        component.breadcrumbs$ = of([]);
        component.currentRouteUrlPath = mockBreadcrumbs[0].url;
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-navbar-header__breadcrumb-active'));
        expect(display).toBeNull();
    });

    it('should display breadcrumb router link (if it is provided)', () => {
        component.breadcrumbs$ = of(mockBreadcrumbs);
        component.currentRouteUrlPath = mockBreadcrumbs[0].url;
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-navbar-header__breadcrumb-separator'));
        expect(display).not.toBeNull();
        expect(display.nativeElement.textContent).toBe('/');
    });

    it('should not display breadcrumb router link (if it is not provided)', () => {
        component.breadcrumbs$ = of([]);
        component.currentRouteUrlPath = mockBreadcrumbs[0].url;
        fixture.detectChanges();

        const display = fixture.debugElement.query(By.css('.c-navbar-header__breadcrumb-separator'));
        expect(display).toBeNull();
    });

    // Controller

    it('should initialize required @inputs with default values', () => {
        expect(component.title).toBeDefined();
        expect(component.showReturnButton).toBeDefined();
    });

    it('should have a breadcrumbs$ observable', () => {
        expect(component.breadcrumbs$).toBeDefined();
        expect(component.breadcrumbs$).toEqual(breadcrumbQuery.breadcrumbs$);
    });

    it('should have currentRouteUrlPath variable', () => {
        expect(component.currentRouteUrlPath).toBeDefined();
    });

    it('should have handleLogout function', () => {
        component.handleLogout();
        expect(component.handleLogout).toBeTruthy();
    });

    it('should have onReturnButtonClick function', () => {
        component.onReturnButtonClick();
        expect(component.onReturnButtonClick).toBeTruthy();
    });

    it('should have getFormattedCurrentRouteUrlPath function', () => {
        expect(component.getFormattedCurrentRouteUrlPath).toBeTruthy();
    });

    it('should return params getFormattedCurrentRouteUrlPath function', () => {
        const params = {key: 'mockKey'};
        const mock = 'mock';

        expect(component.getFormattedCurrentRouteUrlPath(params, mock)).toEqual(getOriginalRoutePathUrlByReplacingParamValues(mock, params));
    });

    it('should return null params getFormattedCurrentRouteUrlPath function', () => {
        expect(component.getFormattedCurrentRouteUrlPath(null, '')).toEqual('')
    });

    it('should have a handleLogout function', async () => {
        const spy = spyOn(keycloakService, 'logout');
        await component.handleLogout();
        expect(spy).toHaveBeenCalled();
    });

    it('should bind onReturnButtonClick to click action of return button', () => {
        const returnButton = fixture.debugElement.query(By.css('.c-navbar-header__return-button'));

        const functionSpy = spyOn(component, 'onReturnButtonClick');

        (returnButton.nativeElement as HTMLElement).click();

        expect(functionSpy).toHaveBeenCalledTimes(1);
    });
});
