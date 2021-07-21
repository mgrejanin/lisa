import { ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { ChargeService, ChargeServiceMock, EventTrackingService } from '@picpay/seller-panel/services';
import { HeaderComponent, LoadingSpinnerComponent, ShareLinksComponent } from '@picpay/seller-panel/shared';
import { MatDialogMock } from '@picpay/angular/shared/helpers';
import { UiComponentsModule } from '@picpay/ui/components';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

import { ChargeValueModalComponent } from '../../components/charge-value-modal/charge-value-modal.component';
import { ChargeComponent } from './charge.component';

import { QRCodeModule } from 'angularx-qrcode';
import { MockComponents, MockModule } from 'ng-mocks';
import { NgxMaskModule } from 'ngx-mask';
import { of, throwError } from 'rxjs';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { SellerPanelAuthService, SellerPanelAuthServiceMock } from '@picpay/seller-panel/auth';

describe('ChargeComponent', () => {
    let component: ChargeComponent;
    let fixture: ComponentFixture<ChargeComponent>;
    let matDialog: MatDialog;
    let notificationService: NotificationsService;
    let chargeService: ChargeService;
    let authService: SellerPanelAuthService;
    let eventTracking: EventTrackingService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ChargeComponent,
                ChargeValueModalComponent,
                MockComponents(LoadingSpinnerComponent, HeaderComponent),
            ],
            imports: [
                QRCodeModule,
                HttpClientTestingModule,
                RouterTestingModule,
                ReactiveFormsModule,
                UiComponentsModule,
                DesignSystemAngularModule,
                MockModule(ClipboardModule),
                MockModule(NgxMaskModule),
                MockModule(MatFormFieldModule),
                MockModule(MatInputModule),
                MockModule(MatButtonModule),
                MockModule(MatIconModule),
                MockModule(MatToolbarModule),
            ],
            providers: [
                { provide: ChargeService, useClass: ChargeServiceMock },
                { provide: MatDialog, useClass: MatDialogMock },
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                { provide: SellerPanelAuthService, useClass: SellerPanelAuthServiceMock },
                EventTrackingService,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChargeComponent);
        component = fixture.componentInstance;

        matDialog = TestBed.inject(MatDialog);
        notificationService = TestBed.inject(NotificationsService);
        chargeService = TestBed.inject(ChargeService);
        authService = TestBed.inject(SellerPanelAuthService);
        eventTracking = TestBed.inject(EventTrackingService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have chargeContent fucntion start in ngOnInit  (Case Success)', () => {
        const chargeContentSpy = spyOn(component, 'getChargeContent');

        component.ngOnInit();

        expect(chargeContentSpy).toHaveBeenCalledTimes(1);
        expect(component.isLoadFailed).toBe(false);
    });

    it('should have chargeContent fucntion start in ngOnInit  (Case Error)', () => {
        const chargeServiceSpy = spyOn(chargeService, 'getChargeTransaction').and.returnValue(
            throwError('Ocorreu um erro não identificado, tente novamente!'),
        );
        const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');

        component.getChargeContent();

        expect(chargeServiceSpy).toHaveBeenCalledTimes(1);
        expect(component.isLoadFailed).toBe(true);
        expect(component.chargeValue).toBe(0);
        expect(component.chargeContent.data.paymentLink).toBe('');
        expect(notificationServiceSpy).toHaveBeenCalledWith(
            'Ocorreu um erro não identificado, tente novamente!',
            'error',
        );
    });

    it('should have onShowModalChargeValue function (chargeValue === 0)', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({
            afterClosed: () => of({ value: 0 }),
        });

        component.onShowModalChargeValue();

        expect(matDialogSpy).toHaveBeenCalledWith(ChargeValueModalComponent, {
            width: '280px',
            panelClass: 'o-modal-reset',
        });
    });

    it('should have onShowModalChargeValue function (chargeValue !== 0)', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.returnValue({
            afterClosed: () => of({ value: 10 }),
        });
        const chargeContentSpy = spyOn(component, 'getChargeContent');
        const eventTrackingClickedSpy = spyOn(component, 'eventTrackingClicked');

        component.onShowModalChargeValue();

        expect(matDialogSpy).toHaveBeenCalledWith(ChargeValueModalComponent, {
            width: '280px',
            panelClass: 'o-modal-reset',
        });
        expect(chargeContentSpy).toHaveBeenCalledTimes(1);
        expect(eventTrackingClickedSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onShowShareLinksModal function', () => {
        const matDialogSpy = spyOn(matDialog, 'open');

        component.onShowShareLinksModal();

        expect(matDialogSpy).toHaveBeenCalledWith(ShareLinksComponent, {
            width: '100%',
            panelClass: 'o-modal-reset',
            data: {
                title: 'Compartilhe seu link',
                contentToCopy: component.chargeContent.data.paymentLink,
                links: component.socialNetworks,
            },
        });
    });

    it('should have onClearChargeValue function', () => {
        const chargeContentSpy = spyOn(component, 'getChargeContent');

        component.onClearChargeValue();

        expect(component.chargeValue).toBe(0);
        expect(chargeContentSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onCopyLinkCallback function (copied === true)', () => {
        const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');
        const eventTrackingClickedSpy = spyOn(component, 'eventTrackingClicked');

        component.onCopyLinkCallback(true);

        expect(notificationServiceSpy).toHaveBeenCalledWith('Link de cobrança copiado com sucesso!', 'done');
        expect(eventTrackingClickedSpy).toHaveBeenCalledWith('COPIAR_LINK');
    });

    it('should have onCopyLinkCallback function (copied === false)', () => {
        const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');

        component.onCopyLinkCallback(false);

        expect(notificationServiceSpy).toHaveBeenCalledWith('Ocorreu um erro ao copiar o link de cobrança!', 'error');
    });

    it('should have eventTrackingClicked function', () => {
        const evtTrackingSpy = spyOn(eventTracking, 'eventTrackingUserCliked');

        component.eventTrackingClicked('SHARE_WHATSAPP');
        expect(evtTrackingSpy).toHaveBeenCalled();
    });

    it('should have onHandleDownloadQrCode function (Case Error)', () => {
        const chargeServiceSpy = spyOn(chargeService, 'downloadQrCode').and.returnValue(
            throwError('Ocorreu um erro não identificado, tente novamente!'),
        );
        const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');

        component.onHandleDownloadQrCode();

        expect(chargeServiceSpy).toHaveBeenCalledTimes(1);
        expect(notificationServiceSpy).toHaveBeenCalledWith(
            'Ocorreu um erro não identificado, tente novamente!',
            'error',
        );
    });

    it('should have onHandleDownloadQrCode function (Case Success)', () => {
        const chargeServiceSpy = spyOn(chargeService, 'downloadQrCode').and.callThrough();
        const evntTracking = spyOn(component, 'eventTrackingClicked');

        component.chargeContent.data.paymentLink = 'whatever.com';

        component.onHandleDownloadQrCode();

        expect(chargeServiceSpy).toHaveBeenCalledTimes(1);
        expect(evntTracking).toHaveBeenCalledTimes(1);
    });

    it('should have onLogout function', () => {
        const logoutSpy = spyOn(authService, 'logout');

        component.onLogout();

        expect(logoutSpy).toHaveBeenCalled();
    });
});
