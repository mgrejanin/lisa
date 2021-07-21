import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

import { MockComponent } from 'ng-mocks';
import { asapScheduler, scheduled, of } from 'rxjs';

import { AutoWithdrawalService } from '@picpay/seller-panel/bank-accounts';
import { NewWithdraw, EventTrackingService } from '@picpay/seller-panel/services';
import {
    BlockedBalanceComponent,
    LoadingSpinnerComponent,
    RequestPasswordComponent,
} from '@picpay/seller-panel/shared';
import { MatDialogMock } from '@picpay/angular/shared/helpers';
import { MockNotificationsService, NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { RequestWithdrawalComponent } from '../modals/request-withdrawal/request-withdrawal.component';
import { ResumeBalanceAvailableComponent } from './resume-balance-available.component';
import { AccountErrorComponent } from '../account-error/account-error.component';

describe('ResumeBalanceAvailableComponent', () => {
    let component: ResumeBalanceAvailableComponent;
    let fixture: ComponentFixture<ResumeBalanceAvailableComponent>;
    let matDialog: MatDialog;
    let autoWithDrawalsService: AutoWithdrawalService;
    let eventTracking: EventTrackingService;
    let notificationService: NotificationsService;

    const body: NewWithdraw = {
        ip: '127.0.0.1',
        bankAccountId: 45,
        value: 10.0,
        confirm: true,
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ResumeBalanceAvailableComponent,
                MatSpinner,
                ResumeBalanceAvailableComponent,
                MockComponent(LoadingSpinnerComponent),
            ],
            imports: [HttpClientTestingModule, MatIconModule],
            providers: [
                { provide: MatDialog, useClass: MatDialogMock },
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                { provide: AutoWithdrawalService, useValue: {
                    getWithdrawalInfo: () => ({}),

                    newWithdrawal: () => of()
                }},
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResumeBalanceAvailableComponent);
        component = fixture.componentInstance;

        matDialog = TestBed.inject(MatDialog);
        autoWithDrawalsService = TestBed.inject(AutoWithdrawalService);
        eventTracking = TestBed.inject(EventTrackingService);
        notificationService = TestBed.inject(NotificationsService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should start the in ngOnInit onLoadInformations function', () => {
        const getWithdrawalInfoSpy = spyOn(autoWithDrawalsService, 'getWithdrawalInfo').and.returnValue(
            scheduled([{}], asapScheduler),
        );

        component.ngOnInit();

        expect(getWithdrawalInfoSpy).toHaveBeenCalledTimes(1);
    });

    it('should onOpenDialog function - RequestWithDraw', () => {
        component.accountError = '';
        const evntTrackingSpy = spyOn(eventTracking, 'eventTrackingUserCliked');
        const matDialogSpy = spyOn(matDialog, 'open').and.callThrough();

        component.onOpenDialog();

        expect(matDialogSpy).toHaveBeenCalledWith(RequestWithdrawalComponent, {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '440px',
            height: '496px',
        });

        expect(evntTrackingSpy).toHaveBeenCalled();
    });

    it('should onOpenDialog function - AccountError', () => {
        component.accountError = 'erro na conta';
        const matDialogSpy = spyOn(matDialog, 'open').and.callThrough();

        component.onOpenDialog();

        expect(matDialogSpy).toHaveBeenCalledWith(AccountErrorComponent, {
            width: '440px',
            panelClass: 'o-modal-reset',
            data: {
                message: component.accountError,
                retryCheckBankAccount: undefined,
            },
        });
    });

    it('should onRequestPassword function', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.callThrough();
        const onRequestPasswordSpy = spyOn(component, 'onRequestPassword').and.callThrough();

        component.onRequestPassword(body);

        expect(onRequestPasswordSpy).toHaveBeenCalledWith({
            ip: '127.0.0.1',
            bankAccountId: 45,
            value: 10.0,
            confirm: true,
        });
        expect(matDialogSpy).toHaveBeenCalledWith(RequestPasswordComponent, {
            panelClass: 'o-modal-reset',
            width: '490px',
            data: {
                caption: 'Para sua segurança, informe a sua senha de acesso para continuar.',
            },
            disableClose: true,
        });
    });

    it('should onRequestWithdrawal function (case error)', () => {
        const notificationSpy = spyOn(notificationService, 'openSnackbar').and.callThrough();
        spyOn(autoWithDrawalsService, 'newWithdrawal').and
        .returnValue(of({ 
            codigo: 'error',
            texto: 'Erro na sua solicitação',
        }));

        component.onRequestWithdrawal(body);

        expect(notificationSpy).toHaveBeenCalledWith('Erro na sua solicitação', SnackbarTypes.ERROR)
    });

    it('should onRequestWithdrawal function (case success)', () => {
        const matDialogSpy = spyOn(matDialog, 'open').and.callThrough();
        spyOn(autoWithDrawalsService, 'newWithdrawal').and
            .returnValue(of({
                codigo: 'success',
                texto: ' ',
            }
        ));

        component.onRequestWithdrawal(body);

        expect(matDialogSpy).toHaveBeenCalledWith(RequestWithdrawalComponent, {
            panelClass: ['o-modal-reset', 'full-screen-modal'],
            width: '490px',
            data: { is_success: true },
        })
    });

    it('should it open modal', () => {
        component.blockedBalance = 200;
        fixture.detectChanges();

        spyOn(matDialog, 'open').and.callThrough();
        const spyonShowblockedBalanceModal = spyOn(component, 'onShowblockedBalanceModal').and.callThrough();

        const button = fixture.debugElement.query(By.css('.c-resume-balance-available--blocked-balance span'));
        button.nativeElement.click();

        component.onShowblockedBalanceModal();

        expect(spyonShowblockedBalanceModal).toHaveBeenCalled();

        expect(matDialog.open).toHaveBeenCalledWith(BlockedBalanceComponent, {
            width: '440px',
            panelClass: 'o-modal-reset',
        });
    });
});
