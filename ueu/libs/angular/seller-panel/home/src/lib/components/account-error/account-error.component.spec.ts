import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent, MockModule } from 'ng-mocks';
import { of, throwError } from 'rxjs';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { EventTracking } from '@picpay/event-tracking';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MatDialogRefMock } from '@picpay/angular/shared/helpers';

import { AccountErrorComponent } from './account-error.component';
import { FeedBackComponent } from '@picpay/seller-panel/shared';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { AccountsService } from '@picpay/seller-panel/bank-accounts';

describe('AccoutErrorComponent', () => {
    let component: AccountErrorComponent;
    let fixture: ComponentFixture<AccountErrorComponent>;
    let dialogRef: MatDialogRef<AccountErrorComponent>;
    let router: Router;
    let accountsService: AccountsService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MockModule(MatDialogModule),
                MockModule(MatIconModule),
                MockModule(DesignSystemAngularModule),
                RouterTestingModule.withRoutes([
                    {
                        path: 'configuracoes/saques-bancarios',
                        loadChildren: () =>
                            import('@picpay/seller-panel/bank-accounts').then(
                                module => module.SellerPanelBankAccountsModule,
                            ),
                    },
                ]),
                HttpClientTestingModule,
            ],
            declarations: [AccountErrorComponent, MockComponent(FeedBackComponent)],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                {
                    provide: NotificationsService,
                    useValue: new MockNotificationsService({ confirmed: true }),
                },
                { provide: MAT_DIALOG_DATA, useValue: {} },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com', release: 'qa' }),
                    },
                },
                {
                    provide: AccountsService, useValue: {
                        checkAccounts: () => (of()),
                    }
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountErrorComponent);
        component = fixture.componentInstance;
        accountsService = TestBed.inject(AccountsService);
        dialogRef = TestBed.inject(MatDialogRef);
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should events onEditAccount function (case if)', async () => {
        const onEditAccountSpy = spyOn(component, 'onEditAccount').and.callThrough();
        const onTryAgainSpy = spyOn(component, 'onTryAgain').and.callThrough();
        component.data.retryCheckBankAccount = true;

        await component.onEditAccount();

        expect(onEditAccountSpy).toHaveBeenCalled();
        expect(onTryAgainSpy).toHaveBeenCalled();
    });

    it('should events onEditAccount function (case else)', async () => {
        component.data.retryCheckBankAccount = false;
        const evtTracking = spyOn(EventTracking, 'track');
        const routerSpy = spyOn(router, 'navigate');

        await component.onEditAccount();

        expect(routerSpy).toHaveBeenCalledWith(['/configuracoes/saques-bancarios']);
        expect(evtTracking).toHaveBeenCalledWith('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User Clicked',
            event_label: 'Bank Account Error Withdraw - To Update',
            error_type: component.data.message,
            seller_id: undefined,
        });
    });

    it('should have onTryAgain function (case success)', () => {
        const onTryAgainSpy = spyOn(component, 'onTryAgain').and.callThrough();
        spyOn(accountsService, 'checkAccounts').and.returnValue(of({
            message: 'Sucesso',
            retryCheckBankAccount: false
        }));

        component.onTryAgain();

        expect(onTryAgainSpy).toHaveBeenCalled();
        expect(component.data.retryCheckBankAccount).toEqual(false);
    });

    it('should have onTryAgain function (case error)', () => {
        const onTryAgainSpy = spyOn(component, 'onTryAgain').and.callThrough();
        spyOn(accountsService, 'checkAccounts').and.returnValue(throwError({
                message: 'Opa! Algo deu errado',
                retryCheckBankAccount: true
            })
        ); 

        component.onTryAgain();

        expect(onTryAgainSpy).toHaveBeenCalled();
        expect(component.data.message).toEqual('Erro checking bank account Opa! Algo deu errado');
        expect(component.data.retryCheckBankAccount).toEqual(true);
    });

    it('should events onInit ', async () => {
        const evtTracking = spyOn(EventTracking, 'track');

        component.ngOnInit();

        expect(evtTracking).toHaveBeenCalledWith('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User Clicked',
            event_label: 'Bank Account Error Withdraw',
            error_type: component.data.message,
            seller_id: undefined,
        });
    });

    it('should events onClose ', async () => {
        const dialogSpy = spyOn(dialogRef, 'close');
        const evtTracking = spyOn(EventTracking, 'track');

        component.onClose();

        expect(dialogSpy).toHaveBeenCalledWith();
        expect(evtTracking).toHaveBeenCalledWith('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User Clicked',
            event_label: 'Bank Account Error Withdraw - Not now',
            error_type: component.data.message,
            seller_id: undefined,
        });
    });

    it('should Close function', () => {
        const dialogSpy = spyOn(dialogRef, 'close');
        const cancelSpy = spyOn(component, 'onClose').and.callThrough();

        fixture.detectChanges();

        const closeButton = fixture.debugElement.query(By.css('.c-account-error__header--close-button')).nativeElement;
        closeButton.click();

        expect(cancelSpy).toHaveBeenCalled();
        expect(dialogSpy).toHaveBeenCalledWith();
    });

    it('should onEditAccount function', () => {
        const dialogSpy = spyOn(dialogRef, 'close');
        const cancelSpy = spyOn(component, 'onEditAccount').and.callThrough();

        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('.c-account-error__footer--btn')).nativeElement;
        button.click();

        expect(cancelSpy).toHaveBeenCalled();
        expect(dialogSpy).toHaveBeenCalledWith();
    });
});
