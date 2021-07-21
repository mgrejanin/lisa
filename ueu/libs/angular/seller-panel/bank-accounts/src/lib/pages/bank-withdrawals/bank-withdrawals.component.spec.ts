import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { MockComponents, MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import {
    SidenavService,
    WithdrawalsService,
    WithdrawalsServiceMock,
    EventTrackingService,
} from '@picpay/seller-panel/services';
import { SidenavComponent } from '@picpay/seller-panel/shared';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MatDialogMock } from '@picpay/angular/shared/helpers';
import { ApolloSnackbar } from '@picpay/design-system-angular-components';

import { StepperService } from '../../state/stepper/stepper.service';
import { BankWithdrawalsComponent } from './bank-withdrawals.component';
import { AccountStepperComponent } from '../../containers/account-stepper/account-stepper.component';
import { AccountsListComponent } from '../../components/accounts-list/accounts-list.component';
import { AutoWithdrawalComponent } from '../../components/auto-withdrawal/auto-withdrawal.component';
import { ModalWarningComponent } from '../../components/modal-warning/modal-warning.component';
import { AccountsService, AccountsStore } from '../../state';
import { CdkPortalComponent } from '../../components/cdk-portal/cdk-portal.component';

describe('BankWithdrawalsComponent', () => {
    let component: BankWithdrawalsComponent;
    let fixture: ComponentFixture<BankWithdrawalsComponent>;
    let sidenavService: SidenavService;
    let stepperService: StepperService;
    let accountsService: AccountsService;
    let matDialog: MatDialog;
    let accountsStore: AccountsStore;
    let eventTracking: EventTrackingService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule, MockModule(DesignSystemAngularModule)],
            declarations: [
                BankWithdrawalsComponent,
                ApolloSnackbar,
                MockComponents(
                    AutoWithdrawalComponent,
                    AccountStepperComponent,
                    AccountsListComponent,
                    SidenavComponent,
                    MatSpinner,
                    CdkPortalComponent,
                ),
            ],
            providers: [
                {
                    provide: SidenavService,
                    useValue: {
                        open: () => {
                            of(true);
                        },
                    },
                },
                { provide: ActivatedRoute, useValue: { queryParamMap: of({ active: true, get: () => 'true' }) } },
                { provide: WithdrawalsService, useClass: WithdrawalsServiceMock },
                { provide: MatDialog, useClass: MatDialogMock },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
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
        fixture = TestBed.createComponent(BankWithdrawalsComponent);
        component = fixture.componentInstance;
        matDialog = TestBed.inject(MatDialog);
        sidenavService = TestBed.inject(SidenavService);
        stepperService = TestBed.inject(StepperService);
        accountsStore = TestBed.inject(AccountsStore);
        accountsService = TestBed.inject(AccountsService);
        eventTracking = TestBed.inject(EventTrackingService);

        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onCreateBankAccount function', () => {
        const updateEditModeSpy = spyOn(stepperService, 'updateEditMode');
        const updateSelectingBankSpy = spyOn(stepperService, 'updateSelectingBank');
        const openSidenavSpy = spyOn(sidenavService, 'open');
        const evntTrackingSpy = spyOn(eventTracking, 'eventTrackingUserCliked');

        component.onCreateBankAccount();

        expect(updateEditModeSpy).toHaveBeenCalledWith(false);
        expect(updateSelectingBankSpy).toHaveBeenCalledWith(true);
        expect(openSidenavSpy).toHaveBeenCalled();
        expect(evntTrackingSpy).toHaveBeenCalled();
    });

    it('should have onModalWarning function', () => {
        const matDialogSpy = spyOn(matDialog, 'open');

        component.onModalWarning();

        expect(matDialogSpy).toHaveBeenCalledWith(ModalWarningComponent, {
            panelClass: 'o-modal-reset',
            width: '560px',
            data: {
                title: 'Saques bancários',
                subtitle: 'Opa, alteração não permitida',
                imagePath: '../assets/images/information.svg',
                caption:
                    'Você tem um empréstimo ativo com o Banco Original e a alteração da conta bancária não é permitida agora.',
                buttons: {
                    confirm: 'Ok, entendi',
                    help: 'Preciso de ajuda',
                },
            },
        });
    });

    it('should open sidenav with parameter active in URL', () => {
        const onOpenSidenavSpy = spyOn(component, 'onOpenSidenav');
        component.ngOnInit();
        expect(onOpenSidenavSpy).toHaveBeenCalled();
    });

    it('should have onCreateBankAccount function (Case unlockFailed)', async () => {
        const onModalWarningSpy = spyOn(component, 'onModalWarning');
        accountsStore.update({ hasHangsAccount: true });

        component.onCreateBankAccount();

        expect(onModalWarningSpy).toHaveBeenCalled();
    });

    it('should have onCreateBankAccount function', async () => {
        const onCreateBankAccountSpy = spyOn(component, 'onCreateBankAccount');
        accountsStore.update({ hasHangsAccount: false });

        // promisse implemented for rendering
        // and open sidenav "Create Account"
        await new Promise(r => setTimeout(r, 550));

        component.onOpenSidenav();

        expect(onCreateBankAccountSpy).toHaveBeenCalled();
    });

    it('should have checkLock function', () => {
        const checkLockAccountsSpy = spyOn(accountsService, 'checkLockAccounts').and.returnValue(of({}));

        component.checkLock();

        expect(checkLockAccountsSpy).toHaveBeenCalled();
    });
});
