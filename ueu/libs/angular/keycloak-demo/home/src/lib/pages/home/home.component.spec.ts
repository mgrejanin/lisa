import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import {
    keycloakConfigMock,
    KeycloakServiceMock,
    PicpayKeycloakConfigService,
    PicpayKeycloakService,
} from '@picpay/keycloak';
import { UiComponentsModule } from '@picpay/ui/components';
import { HomeComponent } from './home.component';
import { KeycloakService } from 'keycloak-angular';
import { MockModule } from 'ng-mocks';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            providers: [
                PicpayKeycloakService,
                { provide: KeycloakService, useValue: new KeycloakServiceMock(true, []) },
                { provide: PicpayKeycloakConfigService, useValue: keycloakConfigMock },
            ],
            imports: [
                DesignSystemAngularModule,
                RouterTestingModule,
                MockModule(MatIconModule),
                MockModule(MatButtonModule),
                MockModule(UiComponentsModule),
                MockModule(MatDividerModule),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a showMenuItem function (and show menu item)', () => {
        component.showMenuItem();

        expect(component.isShowingMenu).toBe(true);
    });

    it('should have a showMenuItem function (and hide menu item)', () => {
        component.showMenuItem();

        expect(component.isShowingMenu).toBe(false);
    });

    it('should have a navigate function', async () => {
        const navigateSpy = spyOn(router, 'navigate');

        await component.navigate();

        expect(navigateSpy).toHaveBeenCalledWith(['/secret']);
    });
});
