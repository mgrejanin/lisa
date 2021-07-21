import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { MockComponents, MockModule } from 'ng-mocks';
import { asapScheduler, of, scheduled, throwError } from 'rxjs';

import { EventTracking } from '@picpay/event-tracking';
import { SellerService, SellerServiceMock, SidenavService } from '@picpay/seller-panel/services';
import { FeedBackComponent } from '@picpay/seller-panel/shared';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { Account } from '../../models';

import { StepperQuery } from '../../state/stepper/stepper.query';

import { AccountsService } from '../../state/accounts/accounts.service';
import { BanksService } from '../../state/banks/banks.service';
import { StepperService } from '../../state/stepper/stepper.service';

import { AccountActionContextComponent } from '../../components/account-action-context/account-action-context.component';
import { AccountConfirmResponseComponent } from '../../components/account-confirm-response/account-confirm-response.component';
import { AccountConfirmComponent } from '../../components/account-confirm/account-confirm.component';
import { AccountDynamicFormComponent } from '../../components/account-dynamic-form/account-dynamic-form.component';
import { AccountStepperComponent } from './account-stepper.component';
import { BanksListComponent } from '../../components/banks-list/banks-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from '@picpay/angular/shared/helpers';
import { ApolloSnackbar } from '@picpay/design-system-angular-components';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('AccountStepperComponent', () => {
    let component: AccountStepperComponent;
    let fixture: ComponentFixture<AccountStepperComponent>;
    let sidenavService: SidenavService;
    let accountsService: AccountsService;
    let stepperQuery: StepperQuery;
    let stepperService: StepperService;
    let banksService: BanksService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MockModule(MatStepperModule),
                MockModule(MatIconModule),
                MockModule(MatCheckboxModule),
                ReactiveFormsModule,
                FormsModule,
            ],
            declarations: [
                AccountStepperComponent,
                ApolloSnackbar,
                MockComponents(
                    BanksListComponent,
                    AccountDynamicFormComponent,
                    AccountConfirmComponent,
                    AccountConfirmResponseComponent,
                    AccountActionContextComponent,
                    MatSpinner,
                    FeedBackComponent,
                ),
            ],
            providers: [
                SidenavService,
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                },
                {
                    provide: SellerService,
                    useClass: SellerServiceMock,
                },
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
        fixture = TestBed.createComponent(AccountStepperComponent);
        component = fixture.componentInstance;

        accountsService = TestBed.inject(AccountsService);
        sidenavService = TestBed.inject(SidenavService);
        stepperService = TestBed.inject(StepperService);
        stepperQuery = TestBed.inject(StepperQuery);
        banksService = TestBed.inject(BanksService);

        // sidenavService.open();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have ngAfterViewInit function', async () => {
        const clearCurrentAccountSpy = spyOn(accountsService, 'clearCurrentAccount');
        const clearSelectedBankSpy = spyOn(banksService, 'clearSelectedBank');
        const stepperSpy = spyOn(component.stepper, 'reset');

        await fixture.whenRenderingDone().then(() => {
            component.ngAfterViewInit();
            sidenavService.closed();

            sidenavService.closed$.subscribe(() => {
                expect(stepperSpy).toHaveBeenCalled();
                expect(clearCurrentAccountSpy).toHaveBeenCalled();
                expect(clearSelectedBankSpy).toHaveBeenCalled();
            });

            expect(component.stepper._steps.length).toEqual(4);
        });
    });

    it('should have onNextStep function', () => {
        const onCloseSpy = spyOn(component, 'onClose');
        const matStepperSpy = spyOn(component.stepper, 'next');
        const evtTrancking = spyOn(EventTracking, 'track');

        component.onNextStep('next');

        expect(matStepperSpy).toHaveBeenCalled();

        expect(evtTrancking).toHaveBeenCalledWith('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account - To continue',
            seller_id: undefined,
        });

        component.onNextStep('close');

        expect(onCloseSpy).toHaveBeenCalled();
    });

    it('should have onSelectionChange function', () => {
        const showCloseButtonSidenavSpy = spyOn(sidenavService.showCloseButton$, 'next');
        const stepperSelectionEventMock = new StepperSelectionEvent();
        stepperSelectionEventMock.selectedIndex = 1;

        component.onSelectionChange(stepperSelectionEventMock);

        expect(component.selectedIndex).toEqual(1);
        expect(showCloseButtonSidenavSpy).toHaveBeenCalledWith(stepperSelectionEventMock.selectedIndex === 0);
    });

    it('should have onConfirmAccount function in editMode', () => {
        const accountScheduled = scheduled<Account>([{}], asapScheduler);
        const editAccountSpy = spyOn(accountsService, 'editAccount').and.returnValue(accountScheduled);

        const updateAccountSpy = spyOn(accountsService, 'updateAccount');
        const nextStepSpy = spyOn(component, 'onNextStep');
        const evtTrancking = spyOn(EventTracking, 'track');

        stepperService.updateEditMode(true);

        component.onConfirmAccount();

        expect(stepperQuery.getValue().isEdit).toBe(true);
        expect(editAccountSpy).toHaveBeenCalled();

        accountScheduled.subscribe(() => {
            expect(updateAccountSpy).toHaveBeenCalled();
            expect(nextStepSpy).toHaveBeenCalledWith('next');
            expect(evtTrancking).toHaveBeenCalledWith('User Clicked', {
                hit_type: 'event',
                event_category: 'clicked',
                event_action: 'User clicked',
                event_label: 'Bank Account - Updated',
                bank_account_type: undefined,
                bank_name: undefined,
                bank_id: undefined,
                seller_id: undefined,
            });
        });

        expect(evtTrancking).toHaveBeenCalledWith('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account - Confirmed',
            bank_account_type: undefined,
            bank_name: undefined,
            bank_id: undefined,
            seller_id: undefined,
        });

        expect(evtTrancking).toHaveBeenCalledWith('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account - Editing',
            bank_account_type: undefined,
            bank_name: undefined,
            bank_id: undefined,
            seller_id: undefined,
        });
    });

    it('should have onConfirmAccount function in editMode error state', () => {
        const editAccountSpy = spyOn(accountsService, 'editAccount').and.returnValue(
            throwError('error at edit account'),
        );
        const previousStepSpy = spyOn(component, 'onPreviousStep');

        stepperService.updateEditMode(true);

        component.onConfirmAccount();

        expect(stepperQuery.getValue().isEdit).toBe(true);
        expect(editAccountSpy).toHaveBeenCalled();

        editAccountSpy().subscribe(
            () => {
                expect(previousStepSpy).not.toHaveBeenCalled();
            },
            () => {
                expect(previousStepSpy).toHaveBeenCalled();
            },
        );
    });

    it('should have onConfirmAccount function in createMode', () => {
        const createAccountSpy = spyOn(accountsService, 'createAccount').and.returnValue(of([{}]));
        const evtTrancking = spyOn(EventTracking, 'track');

        stepperService.updateEditMode(false);

        component.onConfirmAccount();

        expect(stepperQuery.getValue().isEdit).toBe(false);
        expect(createAccountSpy).toHaveBeenCalled();

        expect(evtTrancking).toHaveBeenCalledWith('User Clicked', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Bank Account - Confirmed',
            bank_account_type: undefined,
            bank_name: undefined,
            bank_id: undefined,
            seller_id: undefined,
        });
    });

    it('should have onConfirmAccount function in createMode error state', () => {
        const createAccountErrorSpy = spyOn(accountsService, 'createAccount').and.returnValue(
            throwError('error at add account'),
        );
        const previousStepSpy = spyOn(component, 'onPreviousStep');

        stepperService.updateEditMode(false);

        component.onConfirmAccount();

        expect(createAccountErrorSpy).toHaveBeenCalled();
        expect(previousStepSpy).toHaveBeenCalled();

        expect(stepperQuery.getValue().isEdit).toBe(false);
    });

    it('should have onClose function', () => {
        const closeSpy = spyOn(sidenavService, 'close');

        component.onClose();

        expect(closeSpy).toHaveBeenCalled();
    });

    it('should have onPreviousStep function', () => {
        const toggleCloseBtnSpy = spyOn(sidenavService, 'toggleCloseBtn');
        const toggleErrorSpy = spyOn(accountsService, 'toggleError');
        const previousSpy = spyOn(component.stepper, 'previous');

        component.onPreviousStep();

        expect(toggleCloseBtnSpy).toHaveBeenCalledWith(true);
        expect(toggleErrorSpy).toHaveBeenCalledWith(false);
        expect(previousSpy).toHaveBeenCalled();
    });
});
