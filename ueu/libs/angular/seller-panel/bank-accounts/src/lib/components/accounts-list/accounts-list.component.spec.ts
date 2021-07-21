import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSpinner } from '@angular/material/progress-spinner';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { EventTracking } from '@picpay/event-tracking';
import { SidenavService } from '@picpay/seller-panel/services';
import { ConfirmComponent, LoadingSpinnerComponent } from '@picpay/seller-panel/shared';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MatDialogMock } from '@picpay/angular/shared/helpers';

import { MockComponents, MockModule } from 'ng-mocks';
import { asapScheduler, of, scheduled, throwError } from 'rxjs';

import { AccountsService } from '../../state/accounts/accounts.service';
import { AccountsStore, BanksService } from '../../state';
import { StepperService } from '../../state/stepper/stepper.service';

import { AccountsListComponent } from './accounts-list.component';
import { ModalWarningComponent } from '../modal-warning/modal-warning.component';
import { Account } from '../../models';
import { ApolloSnackbar } from '@picpay/design-system-angular-components';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';

describe('AccountsListComponent', () => {
    let component: AccountsListComponent;
    let fixture: ComponentFixture<AccountsListComponent>;
    let stepperService: StepperService;
    let accountsService: AccountsService;
    let sidenavService: SidenavService;
    let banksService: BanksService;
    let matDialog: MatDialog;
    let accountsStore: AccountsStore;

    const bankAccountsListMock: Account[] = [
        {
            id: 911653,
            type: {
                value: 'P',
                legal_nature: 'PJ',
            },
            operation: 'Tes',
            bank_id: '123',
            branch: '0000',
            branch_digit: '00',
            account: '000000',
            account_digit: '00',
            main: true,
            bank: {
                id: '123',
                name: 'SCFI AGIPLAN',
                img_url: null,
                form_config: {
                    account_digit_limit: 1,
                    account_digit_type: 'number',
                    account_limit: 12,
                    branch_digit_enabled: false,
                    branch_digit_limit: 1,
                    branch_digit_type: 'number',
                    branch_limit: 4,
                },
            },
            account_error: 'conta com erro',
        },
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MockModule(MatIconModule),
                MockModule(DesignSystemAngularModule),
                MockModule(MatMenuModule),
            ],
            declarations: [AccountsListComponent, MockComponents(MatSpinner, LoadingSpinnerComponent), ApolloSnackbar],
            providers: [
                {
                    provide: SidenavService,
                    useValue: {
                        open: () => {
                            of(true);
                        },
                    },
                },
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
        fixture = TestBed.createComponent(AccountsListComponent);
        component = fixture.componentInstance;
        component.editAccountId = 1;

        matDialog = TestBed.inject(MatDialog);
        banksService = TestBed.inject(BanksService);
        sidenavService = TestBed.inject(SidenavService);
        stepperService = TestBed.inject(StepperService);
        accountsService = TestBed.inject(AccountsService);
        accountsStore = TestBed.inject(AccountsStore);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have start getAccounts in ngOnInit', () => {
        const getAccountsSpy = spyOn(component, 'getAccounts');

        component.ngOnInit();

        expect(getAccountsSpy).toHaveBeenCalledTimes(1);
    });

    it('should have getAccounts function', () => {
        const accountsServiceSpy = spyOn(accountsService, 'getAccounts').and.returnValue(of({}));

        component.getAccounts();

        expect(accountsServiceSpy).toHaveBeenCalledTimes(1);
    });

    it('should have openEditAccount function', () => {
        const updateEditModeSpy = spyOn(stepperService, 'updateEditMode');
        const updateSelectingBankSpy = spyOn(stepperService, 'updateSelectingBank');
        const setCurrentAccountSpy = spyOn(accountsService, 'setCurrentAccount');
        const setSelectedBankSpy = spyOn(banksService, 'setSelectedBank');
        const openSidenavSpy = spyOn(sidenavService, 'open');
        const evtTrancking = spyOn(EventTracking, 'track');

        component.openEditAccount(bankAccountsListMock[0]);

        expect(updateEditModeSpy).toHaveBeenCalledWith(true);
        expect(updateSelectingBankSpy).toHaveBeenCalledWith(false);
        expect(setCurrentAccountSpy).toHaveBeenCalledWith({
            id: 911653,
            type: {
                value: 'P',
                legal_nature: 'PJ',
            },
            operation: 'Tes',
            bank_id: '123',
            branch: '0000',
            branch_digit: '00',
            account: '000000',
            account_digit: '00',
            main: true,
            account_error: 'conta com erro',
            bank: {
                id: '123',
                name: 'SCFI AGIPLAN',
                img_url: null,
                form_config: {
                    account_digit_limit: 1,
                    account_digit_type: 'number',
                    account_limit: 12,
                    branch_digit_enabled: false,
                    branch_digit_limit: 1,
                    branch_digit_type: 'number',
                    branch_limit: 4,
                },
            },
        });
        expect(setSelectedBankSpy).toHaveBeenCalledWith({
            id: '123',
            name: 'SCFI AGIPLAN',
            img_url: null,
            form_config: {
                account_digit_limit: 1,
                account_digit_type: 'number',
                account_limit: 12,
                branch_digit_enabled: false,
                branch_digit_limit: 1,
                branch_digit_type: 'number',
                branch_limit: 4,
            },
        });
        expect(openSidenavSpy).toHaveBeenCalled();

        expect(evtTrancking).toHaveBeenCalledWith('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account - To edit',
            seller_id: undefined,
        });
    });

    it('should have onSetAsPrincipalAccount function', () => {
        const setAccountAsPrincipalSpy = spyOn(accountsService, 'setAccountAsPrincipal').and.returnValue(
            scheduled([{}], asapScheduler),
        );

        component.onSetAsPrincipalAccount(bankAccountsListMock[0]);

        expect(setAccountAsPrincipalSpy).toHaveBeenCalledWith(911653);
    });

    it('should have onModalWarning function', () => {
        const matDialogSpy = spyOn(matDialog, 'open');
        component.onModalWarning(
            'Saques bancários',
            'Opa, alteração não permitida',
            '../assets/images/information.svg',
            'Você tem um empréstimo ativo com o Banco Original e a alteração da conta bancária não é permitida agora.',
            {
                confirm: 'Ok, entendi',
                help: 'Preciso de ajuda',
            },
        );

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

    it('should have dispatchEventChangeAccount function { case: onSetAsPrincipalAccount }', () => {
        const onSetAsPrincipalAccountSpy = spyOn(component, 'onSetAsPrincipalAccount');

        component.actionTypeAccount = 'onSetAsPrincipalAccount';
        component.dispatchEventChangeAccount(bankAccountsListMock[0]);

        expect(onSetAsPrincipalAccountSpy).toHaveBeenCalledTimes(1);
    });

    it('should have dispatchEventChangeAccount function { case: openEditAccount }', () => {
        const openEditAccountSpy = spyOn(component, 'openEditAccount');

        component.actionTypeAccount = 'openEditAccount';
        component.dispatchEventChangeAccount(bankAccountsListMock[0]);

        expect(openEditAccountSpy).toHaveBeenCalledTimes(1);
    });

    it('should have dispatchEventChangeAccount function { case: onRemoveAccount }', () => {
        const onRemoveAccountSpy = spyOn(component, 'onRemoveAccount');

        component.actionTypeAccount = 'onRemoveAccount';
        component.dispatchEventChangeAccount(bankAccountsListMock[0]);

        expect(onRemoveAccountSpy).toHaveBeenCalledTimes(1);
    });

    it('should have dispatchEventChangeAccount function { case: default }', () => {
        component.dispatchEventChangeAccount(bankAccountsListMock[0]);
    });

    it('should have verifyPermissionEditAccount function { case: hasHangsAccountTrue }', () => {
        const unlockAccountsSpy = spyOn(accountsService, 'unlockAccounts').and.returnValue(of(true));
        accountsStore.update({ hasHangsAccount: true });

        component.verifyPermissionEditAccount(bankAccountsListMock[0], 'onSetAsPrincipalAccount');

        expect(unlockAccountsSpy).toHaveBeenCalled();
    });

    it('should have verifyPermissionEditAccount function { case: hasHangsAccountTrue_NotAuthorizated }', () => {
        const unlockAccountsSpy = spyOn(accountsService, 'unlockAccounts').and.returnValue(of(false));
        accountsStore.update({ hasHangsAccount: true });

        component.verifyPermissionEditAccount(bankAccountsListMock[0], 'onSetAsPrincipalAccount');

        expect(unlockAccountsSpy).toHaveBeenCalled();
    });

    it('should have verifyPermissionEditAccount function { case: hasHangsAccountFalse }', () => {
        const dispatchEventChangeAccountSpy = spyOn(component, 'dispatchEventChangeAccount');
        accountsStore.update({ hasHangsAccount: false });

        component.verifyPermissionEditAccount(bankAccountsListMock[0], 'onSetAsPrincipalAccount');

        expect(dispatchEventChangeAccountSpy).toBeCalledTimes(1);
    });

    it('should have verifyPermissionEditAccount function (Case Error)', () => {
        const unlockAccountsSpy = spyOn(accountsService, 'unlockAccounts').and.returnValue(throwError({}));
        accountsStore.update({ hasHangsAccount: true });

        component.verifyPermissionEditAccount(bankAccountsListMock[0], 'onSetAsPrincipalAccount');

        expect(unlockAccountsSpy).toHaveBeenCalled();
    });

    it('should have openConfirm function', () => {
        const matDialogSpy = spyOn(matDialog, 'open');

        component.openConfirm();

        expect(matDialogSpy).toHaveBeenCalledWith(ConfirmComponent, {
            panelClass: 'o-modal-reset',
            width: '360px',
            data: {
                title: 'Excluir conta',
                caption: 'Ei, você está prestes a excluir uma conta. Deseja realmente fazer isso agora?',
                buttons: {
                    cancel: 'Cancelar',
                    confirm: 'Sim, excluir',
                },
            },
        });
    });

    it('should have onRemoveAccount function', () => {
        const removeAccountSpy = spyOn(accountsService, 'removeAccount').and.returnValue(
            scheduled([{}], asapScheduler),
        );

        component.onRemoveAccount(bankAccountsListMock[0]);

        expect(removeAccountSpy).toHaveBeenCalledWith(911653);
    });

    it('should not trigger onRemoveAccount function', (done: jest.DoneCallback) => {
        const openConfirmSpy = spyOn(component, 'openConfirm').and.returnValue({
            afterClosed: () => scheduled([{ confirm: false }], asapScheduler),
        });
        const removeAccountSpy = spyOn(accountsService, 'removeAccount').and.returnValue(
            scheduled([{}], asapScheduler),
        );

        component.onRemoveAccount(bankAccountsListMock[0]);

        component
            .openConfirm()
            .afterClosed()
            .subscribe(() => {
                expect(openConfirmSpy).toHaveBeenCalled();
                expect(removeAccountSpy).not.toHaveBeenCalled();
                done();
            });
    });
});
