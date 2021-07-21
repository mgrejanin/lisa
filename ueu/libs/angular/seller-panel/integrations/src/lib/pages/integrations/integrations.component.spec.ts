import { MockComponents, MockModule } from 'ng-mocks';
import { of, throwError } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogMock } from '@picpay/angular/shared/helpers';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { ApolloSnackbar } from '@picpay/design-system-angular-components';
import { EventTracking } from '@picpay/event-tracking';
import { SellerPanelAuthService, SellerPanelAuthServiceMock } from '@picpay/seller-panel/auth';
import { EcommerceService, EcommerceServiceMock } from '@picpay/seller-panel/services';
import { HeaderComponent, LoadingSpinnerComponent } from '@picpay/seller-panel/shared';

import { GenerateNewTokenComponent } from '../../components/generate-new-token/generate-new-token.component';
import { InputsApisComponent } from '../../components/inputs-apis/inputs-apis.component';
import { IntegrationsComponent } from './integrations.component';

describe('IntegrationsComponent', () => {
    let component: IntegrationsComponent;
    let fixture: ComponentFixture<IntegrationsComponent>;
    let matDialog: MatDialog;
    let ecommerceService: EcommerceService;
    let authService: SellerPanelAuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MockModule(MatIconModule),
                MockModule(MatDividerModule),
                MockModule(MatTabsModule),
                MockModule(DesignSystemAngularModule),
                NoopAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            declarations: [
                IntegrationsComponent,
                ApolloSnackbar,
                MockComponents(HeaderComponent, LoadingSpinnerComponent, InputsApisComponent),
            ],
            providers: [
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                },
                {
                    provide: EcommerceService,
                    useClass: EcommerceServiceMock,
                },
                {
                    provide: SellerPanelAuthService,
                    useClass: SellerPanelAuthServiceMock,
                },
            ],
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: {
                    entryComponents: [ApolloSnackbar],
                },
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IntegrationsComponent);
        component = fixture.componentInstance;

        matDialog = TestBed.inject(MatDialog);
        ecommerceService = TestBed.inject(EcommerceService);
        authService = TestBed.inject(SellerPanelAuthService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onGetTokens function (Case Success)', () => {
        const ecommerceServiceSpy = spyOn(ecommerceService, 'getTokens').and.callThrough();

        component.ngOnInit();

        expect(component.loading).toBe(false);
        expect(ecommerceServiceSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onGetTokens function (Case Error)', () => {
        const ecommerceServiceSpy = spyOn(ecommerceService, 'getTokens').and.returnValue(
            throwError({
                error: {
                    title: 'Ocorreu um erro ao carregar os tokens de integração!',
                },
            }),
        );

        component.ngOnInit();

        expect(component.loading).toBe(false);
        expect(ecommerceServiceSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onTabChanged function', () => {
        const evtTracking = spyOn(EventTracking, 'track');
        const event = {
            index: 1,
            tab: {
                isActive: true,
                origin: 1,
                position: 0,
                textLabel: 'Sou cliente Vtex',
            },
        };

        component.onTabChanged(event);

        expect(evtTracking).toHaveBeenCalledWith('Tab Selected', {
            selected_field: event.tab,
            action: 'Sou Cliente VTEX / Use a API Pública',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Tab Selected',
        });
    });

    it('should have onSetInputTokens function, define vtex  and public', () => {
        const objMockTokens = {
            application_key: '123abc',
            application_token: '123abc',
            x_picpay_token: 'title',
            x_seller_token: 'title',
        };

        component.onSetInputTokens(objMockTokens);

        expect(component.haveTokens).toBeTruthy;
        expect(component.inputTokens.vtex.x_picpay_token).toEqual(objMockTokens.application_token);
    });

    it('should have onGenerateTokens function (haveTokens true)', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({ afterClosed: () => of(true) });
        const onRequestTokensSpy = spyOn(component, 'onRequestTokens');

        component.haveTokens = true;
        component.onGenerateTokens();

        expect(matDialogSpy).toHaveBeenCalledWith(GenerateNewTokenComponent, {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '560px',
        });
        expect(onRequestTokensSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onGenerateTokens function (haveTokens false)', () => {
        const onRequestTokensSpy = spyOn(component, 'onRequestTokens');

        component.haveTokens = false;
        component.onGenerateTokens();

        expect(onRequestTokensSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onRequestTokens function (Case Success)', () => {
        const ecommerceServiceSpy = spyOn(ecommerceService, 'generateTokens').and.callThrough();
        const evtTracking = spyOn(EventTracking, 'track');

        component.onRequestTokens();

        expect(ecommerceServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.loading).toBe(false);
        expect(evtTracking).toHaveBeenCalledWith('Dialog Interacted', {
            selected_field: 'Gerar novos tokens ',
            action: 'novo_token',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Dialog Interacted',
        });
    });

    it('should have onRequestTokens function (Case Error)', () => {
        const ecommerceServiceSpy = spyOn(ecommerceService, 'generateTokens').and.returnValue(
            throwError({
                error: {
                    title: 'Ocorreu um erro ao gerar seus tokens!',
                },
            }),
        );
        const evtTracking = spyOn(EventTracking, 'track');

        component.onRequestTokens();

        expect(ecommerceServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.loading).toBe(false);
        expect(evtTracking).toHaveBeenCalledWith('Dialog Interacted', {
            selected_field: 'Gerar novos tokens ',
            action: 'novo_token',
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Dialog Interacted',
        });
    });

    it('should have onLogout function', () => {
        const logoutSpy = spyOn(authService, 'logout');

        component.onLogout();

        expect(logoutSpy).toHaveBeenCalled();
    });
});
