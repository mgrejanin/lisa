import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { NewWithdrawComponent } from './new-withdraw.component';

import { AutoWithdrawalService } from '@picpay/seller-panel/bank-accounts';
import { RequestWithdrawalComponent } from '../modals/request-withdrawal/request-withdrawal.component';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { asapScheduler, scheduled } from 'rxjs';
import { MockModule } from 'ng-mocks';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

describe('NewWithdrawComponent', () => {
    let component: NewWithdrawComponent;
    let fixture: ComponentFixture<NewWithdrawComponent>;
    let autoWithDrawalsService: AutoWithdrawalService;
    let matDialogRef: MatDialogRef<RequestWithdrawalComponent>;

    const primary_bank_account = {
        id: 49,
        type: {
            value: 'C',
            legal_nature: 'PJ',
        },
        operation: '',
        bank_id: '756',
        branch: '345357',
        branch_digit: null,
        account: '4467810',
        account_digit: '12',
        main: true,
        document: '21089691000111',
        bank: {
            id: '756',
            name: 'BANCO COOPERATIVO DO BRASIL',
            img_url: 'https://s3-sa-east-1.amazonaws.com/picpay/banks/ico_cadastro_sicoob.png',
            preferred: 1,
            preferred_order: 7,
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
        automatic_bank_account: true,
        future_releases: 1154.48,
        balance_available: 10900,
        blocked_balance: 0,
        withdraw_fee: 0,
        available_for_withdrawal: 10900,
        has_seller_account: true,
        last_withdrawal: null,
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MockModule(DesignSystemAngularModule), SellerPanelSharedModule, HttpClientTestingModule],
            declarations: [NewWithdrawComponent],
            providers: [
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
        fixture = TestBed.createComponent(NewWithdrawComponent);
        component = fixture.componentInstance;

        autoWithDrawalsService = TestBed.inject(AutoWithdrawalService);
        matDialogRef = TestBed.inject(MatDialogRef);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should start in ngOnInit onBuildForm funcion', () => {
        component.data = primary_bank_account;

        const onBuildFormSpy = spyOn(component, 'onBuildForm');

        component.ngOnInit();

        expect(onBuildFormSpy).toHaveBeenCalledWith(10900);
    });

    it('should have onChangeAccount function', () => {
        const goToListAccountsSpy = spyOn(component.goToListAccounts, 'emit');

        component.onChangeAccount();

        expect(goToListAccountsSpy).toHaveBeenCalledWith(true);
    });

    it('should have onConfirm function', () => {
        const onCloseSpy = spyOn(matDialogRef, 'close');

        component.priceForm.setValue({ price: 10.0 });

        component.onConfirm(primary_bank_account?.id);

        fixture.detectChanges();

        expect(component.priceForm.valid).toBeTruthy();
        expect(onCloseSpy).toHaveBeenCalledWith({
            bankAccountId: 49,
            ip: '127.0.0.1',
            confirm: true,
            value: 10.0,
        });
    });

    it('should have onClose function', () => {
        const closeSpy = spyOn(matDialogRef, 'close');

        component.onClose();

        expect(closeSpy).toHaveBeenCalledWith({ confirm: false });
    });

    it('should have onTryAgain function', () => {
        const getWithdrawalInfoSpy = spyOn(autoWithDrawalsService, 'getWithdrawalInfo').and.returnValue(
            scheduled([{}], asapScheduler),
        );

        component.onTryAgain();

        expect(getWithdrawalInfoSpy).toHaveBeenCalledTimes(1);
    });
});
