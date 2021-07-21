import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { Account, AccountsService, AutoWithdrawalService } from '@picpay/seller-panel/bank-accounts';
import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { AccountsComponent } from '../../accounts/accounts.component';
import { NewWithdrawComponent } from '../../new-withdraw/new-withdraw.component';
import { RequestWithdrawalComponent } from './request-withdrawal.component';

import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockModule } from 'ng-mocks';
import { NgxMaskModule } from 'ngx-mask';
import { asapScheduler, scheduled } from 'rxjs';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

describe('RequestWithdrawalComponent', () => {
    let component: RequestWithdrawalComponent;
    let fixture: ComponentFixture<RequestWithdrawalComponent>;
    let accountsService: AccountsService;
    let autoWithDrawalsService: AutoWithdrawalService;
    let matDialogRef: MatDialogRef<RequestWithdrawalComponent>;
    let router: Router;

    const data = {};
    const currentAccout: Account = {
        id: 48,
        type: {
            value: 'C',
            legal_nature: 'PJ',
        },
        operation: '',
        bank_id: '999',
        branch: '00010',
        branch_digit: null,
        account: '3593590',
        account_digit: '5',
        main: false,
        document: '21089691000111',
        bank: {
            id: '999',
            name: 'STONE PAGAMENTOS S.A',
            img_url: 'https://s3-sa-east-1.amazonaws.com/picpay/banks/ico_cadastro_stone.png',
            form_config: {
                account_limit: null,
                branch_limit: null,
                branch_digit_enabled: null,
                branch_digit_type: null,
                account_digit_type: null,
                account_types: [
                    {
                        label: 'Conta corrente pessoa física',
                        value: 'C',
                        legal_nature: 'PF',
                    },
                    {
                        label: 'Conta corrente pessoa jurídica',
                        value: 'C',
                        legal_nature: 'PJ',
                    },
                    {
                        label: 'Conta poupança pessoa física',
                        value: 'P',
                        legal_nature: 'PF',
                    },
                    {
                        label: 'Conta poupança pessoa jurídica',
                        value: 'P',
                        legal_nature: 'PJ',
                    },
                ],
            },
        },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                MockModule(DesignSystemAngularModule),
                SellerPanelSharedModule,
                RouterTestingModule,
                HttpClientTestingModule,
                MockModule(MatIconModule),
                MockModule(NgxMaskModule),
            ],
            declarations: [RequestWithdrawalComponent, AccountsComponent, NewWithdrawComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: data },
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                {
                    provide: NotificationsService,
                    useValue: new MockNotificationsService({ confirmed: true }),
                },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestWithdrawalComponent);
        component = fixture.componentInstance;

        accountsService = TestBed.inject(AccountsService);
        autoWithDrawalsService = TestBed.inject(AutoWithdrawalService);
        matDialogRef = TestBed.inject(MatDialogRef);
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should start the in ngOnInit onLoadInformations and onLoadAccountsList functions', () => {
        const onLoadAccountsListSpy = spyOn(component, 'onLoadAccountsList');
        const onLoadInformations = spyOn(component, 'onLoadInformations');

        component.ngOnInit();

        expect(onLoadAccountsListSpy).toHaveBeenCalledTimes(1);
        expect(onLoadInformations).toHaveBeenCalledTimes(1);
    });

    it('Should have onLoadAccountsList function', () => {
        const getAccountsSpy = spyOn(accountsService, 'getAccounts').and.returnValue(scheduled([{}], asapScheduler));

        component.onLoadAccountsList();

        expect(getAccountsSpy).toHaveBeenCalledTimes(1);
    });

    it('Should have onLoadInformations function', () => {
        const getWithdrawalInfoSpy = spyOn(autoWithDrawalsService, 'getWithdrawalInfo').and.returnValue(
            scheduled([{}], asapScheduler),
        );

        component.onLoadInformations();

        expect(getWithdrawalInfoSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onToggleTemplates function (true)', () => {
        component.onToggleTemplates(true);

        expect(component.isChangeAccount).toBe(true);
    });

    it('should have onToggleTemplates function (false)', () => {
        component.onToggleTemplates(false);

        expect(component.isChangeAccount).toBe(false);
    });

    it('should have onReceiveAccount function', () => {
        component.onReceiveAccount(currentAccout);

        expect(component.isOtherAccount).toMatchObject({
            id: 48,
            type: {
                value: 'C',
                legal_nature: 'PJ',
            },
            operation: '',
            bank_id: '999',
            branch: '00010',
            branch_digit: null,
            account: '3593590',
            account_digit: '5',
            main: false,
            document: '21089691000111',
            bank: {
                id: '999',
                name: 'STONE PAGAMENTOS S.A',
                img_url: 'https://s3-sa-east-1.amazonaws.com/picpay/banks/ico_cadastro_stone.png',
                form_config: {
                    account_limit: null,
                    branch_limit: null,
                    branch_digit_enabled: null,
                    branch_digit_type: null,
                    account_digit_type: null,
                    account_types: [
                        {
                            label: 'Conta corrente pessoa física',
                            value: 'C',
                            legal_nature: 'PF',
                        },
                        {
                            label: 'Conta corrente pessoa jurídica',
                            value: 'C',
                            legal_nature: 'PJ',
                        },
                        {
                            label: 'Conta poupança pessoa física',
                            value: 'P',
                            legal_nature: 'PF',
                        },
                        {
                            label: 'Conta poupança pessoa jurídica',
                            value: 'P',
                            legal_nature: 'PJ',
                        },
                    ],
                },
            },
        });
    });

    it('should have onPageExtract funtion', async () => {
        const routerSpy = spyOn(router, 'navigate');
        const onCloseSpy = spyOn(matDialogRef, 'close');

        await component.onPageExtract();
        matDialogRef.close();

        expect(routerSpy).toHaveBeenLastCalledWith(['/extrato/listagem']);
        expect(onCloseSpy).toHaveBeenCalled();
    });

    it('should have onClose function', () => {
        const onCloseSpy = spyOn(matDialogRef, 'close');

        component.onClose();

        expect(onCloseSpy).toHaveBeenCalledWith({ confirm: false });
    });
});
