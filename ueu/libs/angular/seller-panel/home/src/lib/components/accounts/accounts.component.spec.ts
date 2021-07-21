import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent, MockModule } from 'ng-mocks';
import { of } from 'rxjs';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { Account, AccountsService, AccountsServiceMock } from '@picpay/seller-panel/bank-accounts';
import { FeedBackComponent } from '@picpay/seller-panel/shared';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { AccountsComponent } from './accounts.component';
import { RequestWithdrawalComponent } from '../modals/request-withdrawal/request-withdrawal.component';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

describe('AccountsComponent', () => {
    let component: AccountsComponent;
    let fixture: ComponentFixture<AccountsComponent>;
    let accountsService: AccountsService;
    let matDialogRef: MatDialogRef<RequestWithdrawalComponent>;
    let router: Router;

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
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule,
                MockModule(MatProgressSpinnerModule),
                MockModule(MatIconModule),
                MockModule(DesignSystemAngularModule),
            ],
            declarations: [AccountsComponent, MockComponent(FeedBackComponent)],
            providers: [
                { provide: AccountsService, useClass: AccountsServiceMock },
                {
                    provide: NotificationsService,
                    useValue: new MockNotificationsService({ confirmed: true }),
                },
                { provide: MatDialogRef, useClass: MatDialogRefMock },
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
        fixture = TestBed.createComponent(AccountsComponent);
        component = fixture.componentInstance;

        accountsService = TestBed.inject(AccountsService);
        matDialogRef = TestBed.inject(MatDialogRef);
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have onSelectAccount function', () => {
        const onBackSpy = spyOn(component, 'onBack');

        const accountWithdrawSpy = spyOn(component.accountWithdraw, 'emit');
        const selectedSpy = spyOn(component.selected, 'emit');

        component.onSelectAccount(currentAccout);

        expect(selectedSpy).toHaveBeenCalled();
        expect(accountWithdrawSpy).toHaveBeenCalledWith(currentAccout);
        expect(onBackSpy).toHaveBeenCalled();
    });

    it('should have onAddAccount funtion', async () => {
        const routerSpy = spyOn(router, 'navigate');
        const onCloseSpy = spyOn(matDialogRef, 'close');

        await component.onAddAccount();
        matDialogRef.close();

        expect(routerSpy).toHaveBeenLastCalledWith(['/configuracoes/saques-bancarios'], {
            queryParams: { active: true },
        });
        expect(onCloseSpy).toHaveBeenCalled();
    });

    it('should have onBack function', () => {
        const backToNewWithdrawSpy = spyOn(component.backToNewWithdraw, 'emit');

        component.onBack();
        component.backToNewWithdraw.emit(false);

        expect(backToNewWithdrawSpy).toHaveBeenCalledWith(false);
    });

    it('should have onClose function', () => {
        const onCloseSpy = spyOn(matDialogRef, 'close');

        component.onClose();

        expect(onCloseSpy).toHaveBeenCalledWith({ confirm: false });
    });

    it('should have onTryAgain function', () => {
        const getAccountsSpy = spyOn(accountsService, 'getAccounts').and.returnValue(of([]));

        component.onTryAgain();

        expect(getAccountsSpy).toHaveBeenCalledTimes(1);
    });
});
