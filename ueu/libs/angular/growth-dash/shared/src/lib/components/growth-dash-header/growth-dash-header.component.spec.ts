import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    keycloakConfigMock,
    KeycloakServiceMock,
    PicpayKeycloakConfigService,
    PicpayKeycloakService,
} from '@picpay/keycloak';
import { MatIconModule } from '@angular/material/icon';

import { KeycloakService } from 'keycloak-angular';
import { MockComponents, MockModule } from 'ng-mocks';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { GrowthDashHeaderComponent } from './growth-dash-header.component';
import { UserDropdownComponent } from '@picpay/ui/components';

describe('GrowthDashHeaderComponent', () => {
    let component: GrowthDashHeaderComponent;
    let fixture: ComponentFixture<GrowthDashHeaderComponent>;
    let keycloakService: KeycloakService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DesignSystemAngularModule, MockModule(MatIconModule)],
            declarations: [GrowthDashHeaderComponent, MockComponents(UserDropdownComponent)],
            providers: [
                { provide: PicpayKeycloakConfigService, useValue: keycloakConfigMock },
                { provide: KeycloakService, useValue: new KeycloakServiceMock(true, []) },
                PicpayKeycloakService,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GrowthDashHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        keycloakService = TestBed.inject(KeycloakService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a logout function', async () => {
        const spyKeycloakService = spyOn(keycloakService, 'logout');
        await component.onLogout();

        expect(spyKeycloakService).toHaveBeenCalled();
    });
});
