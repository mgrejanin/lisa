import { BanksQuery, BanksQueryMock } from './../../state/banks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockComponents, MockModule } from 'ng-mocks';

import { SellerService, SellerServiceMock } from '@picpay/seller-panel/services';
import {
    AutoTabDirective,
    CpfCnpjFormatterDirective,
    NumericDirective,
    ValidationMessagesComponent,
} from '@picpay/seller-panel/shared';

import { CpfCnpjPipe, CpfPipe } from '@picpay/angular/shared/pipes';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { BankConfig, LegalNature } from '../../models';

import { AccountDynamicFormComponent } from './account-dynamic-form.component';

import { StepperService } from '../../state/stepper/stepper.service';
import { currentAccountMock } from '../../state/accounts/mocks/query.mock';

import { of } from 'rxjs';
import { ApolloSnackbar } from '@picpay/design-system-angular-components';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock } from '@picpay/angular/shared/helpers';

describe('AccountDynamicFormComponent', () => {
    let component: AccountDynamicFormComponent;
    let fixture: ComponentFixture<AccountDynamicFormComponent>;
    let stepperService: StepperService;

    let bankConfigMock: BankConfig = {
        account_digit_limit: 1,
        account_digit_type: 'number',
        account_limit: 12,
        account_types: [
            {
                label: 'Conta Corrente pessoa física',
                value: 'C',
                legal_nature: 'PF',
            },
            {
                label: 'Conta Corrente pessoa juridica',
                value: 'C',
                legal_nature: 'PJ',
            },
            {
                label: 'Conta Poupança pessoa física',
                value: 'P',
                legal_nature: 'PF',
            },
            {
                label: 'Conta Poupança pessoa jurídica',
                value: 'P',
                legal_nature: 'PJ',
            },
        ],
        branch_digit_enabled: false,
        branch_digit_limit: 1,
        branch_digit_type: 'number',
        branch_limit: 4,
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                MockModule(MatFormFieldModule),
                MockModule(MatSelectModule),
                MockModule(MatTooltipModule),
            ],
            declarations: [
                AccountDynamicFormComponent,
                CpfCnpjFormatterDirective,
                NumericDirective,
                AutoTabDirective,
                ApolloSnackbar,
                MockComponents(MatIcon, MatCheckbox, ValidationMessagesComponent),
            ],
            providers: [
                CpfPipe,
                CpfCnpjPipe,
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                {
                    provide: SellerService,
                    useClass: SellerServiceMock,
                },
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                },
                { provide: BanksQuery, useClass: BanksQueryMock },
            ],
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: {
                    entryComponents: [ApolloSnackbar],
                },
            })
            .compileComponents();
    });

    describe('normal test case', () => {
        beforeEach(() => {
            fixture = TestBed.createComponent(AccountDynamicFormComponent);
            component = fixture.componentInstance;

            stepperService = TestBed.inject(StepperService);

            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should have account form', () => {
            const form = component.form;
            expect(form).toBeDefined();

            expect(
                form.get(['bank_id', 'type', 'document', 'branch', 'branch_digit', 'account', 'account_digit', 'main']),
            ).toBeDefined();
        });

        it('should have setBankConfigValidators function', () => {
            component.setBankConfigValidators(bankConfigMock);

            expect(component.bankConfig).toEqual(bankConfigMock);
        });

        it('#setBankConfigValidators() should set formControl `id` when is edit mode', () => {
            const form = component.form;
            stepperService.updateEditMode(true);

            component.setBankConfigValidators(bankConfigMock);

            expect(form).toBeDefined();
            expect(form.get('id')).toBeDefined();

            stepperService.updateEditMode(false);

            component.setBankConfigValidators(bankConfigMock);
            expect(form.get('id')).toBeNull();
        });

        it('#setBankConfigValidators() should enable `branch_digit` when branch_digit_enabled', () => {
            const form = component.form;
            bankConfigMock = {
                ...bankConfigMock,
                branch_digit_enabled: true,
            };

            component.setBankConfigValidators(bankConfigMock);

            expect(form).toBeDefined();
            expect(form.get('branch_digit').enabled).toBe(true);

            bankConfigMock = {
                ...bankConfigMock,
                branch_digit_enabled: false,
            };

            component.setBankConfigValidators(bankConfigMock);
            expect(form.get('branch_digit').disabled).toBe(true);
        });

        it('should have getPureValueFromDocumentField function', () => {
            expect(component.form).toBeDefined();

            component.form.patchValue({ document: '000.000.000-11' });
            expect(component.getPureValueFromDocumentField()).toEqual('00000000011');

            component.form.patchValue({ document: '22.896.431/0001-10' });
            expect(component.getPureValueFromDocumentField()).toEqual('22896431000110');
        });

        it('should have showBanksList function', () => {
            const updateSelectingBankSpy = spyOn(stepperService, 'updateSelectingBank');

            component.showBanksList();

            expect(updateSelectingBankSpy).toHaveBeenCalledWith(true);
        });

        it('should have change type value form', () => {
            const clearValidatorsSpy = spyOn(component.form.get('document'), 'clearValidators');
            const setValidatorsSpy = spyOn(component.form.get('document'), 'setValidators');
            const enableSpy = spyOn(component.form.get('document'), 'enable');
            const disableSpy = spyOn(component.form.get('document'), 'disable');
            const setCpfCnpjTypeInputSpy = spyOn(component, 'setCpfCnpjTypeInput');

            component.form.patchValue({ type: { value: 'P', legal_nature: 'PJ' } });

            expect(clearValidatorsSpy).toHaveBeenCalled();
            expect(disableSpy).toHaveBeenCalled();
            expect(setCpfCnpjTypeInputSpy).toHaveBeenCalled();
            expect(component.form.get('document').value).toEqual('00.000.000/0001-03');

            component.form.patchValue({ type: { value: 'C', legal_nature: 'PF' } });

            expect(setValidatorsSpy).toHaveBeenCalled();
            expect(enableSpy).toHaveBeenCalled();
        });

        it('should have onConfirmAccount function', () => {
            const setAccountDataSpy = spyOn(component, 'setAccountData');
            const nextSpy = spyOn(component.next, 'emit');
            expect(component.form).toBeDefined();

            component.onConfirmAccount();
            expect(component.form.valid).toBe(false);
            expect(setAccountDataSpy).not.toHaveBeenCalled();
            expect(nextSpy).not.toHaveBeenCalled();

            component.form.patchValue({
                bank_id: '1212',
                type: { value: 'P', legal_nature: 'PF' },
                document: '146.499.626-17',
                branch: '0001',
                branch_digit: '1',
                account: '2222',
                account_digit: '3',
                main: false,
            });

            component.onConfirmAccount();

            expect(component.form.valid).toBe(true);
            expect(setAccountDataSpy).toHaveBeenCalled();
            expect(nextSpy).toHaveBeenCalled();
        });

        it('should build form and the initialAccountDataForm in ngOnInit (isEdit true)', () => {
            component.account$ = of(currentAccountMock);

            stepperService.updateEditMode(true);

            expect(component.initialAccountDataForm).toBeUndefined();
            expect(component.form.value.id).toBe(null);

            component.ngOnInit();

            expect(component.initialAccountDataForm).toMatchObject({
                id: 48,
                bank_id: '999',
                type: { value: 'C', legal_nature: 'PJ' },
                branch: '00010',
                branch_digit: null,
                account: '3593590',
                account_digit: '5',
                document: '21089691000111',
                main: false,
            });
            expect(component.form.value).toMatchObject({
                id: 48,
                bank_id: '999',
                type: { value: 'C', legal_nature: 'PJ' },
                branch: '00010',
                account: '3593590',
                account_digit: '5',
                main: false,
            });
        });

        it('should setCpfCnpjTypeInput return PJ tooltip when isPhysicalPerson falsy and document lengh > 11 and legalNature = PJ', () => {
            component.setCpfCnpjTypeInput(LegalNature.PJ, '00000000000000', false);

            expect(component.documentTypeInput).toEqual('PJ');
            expect(component.toolTipLabel).toEqual(
                'A conta precisa ser do mesmo CNPJ da empresa, para não haver problemas nos recebimentos das suas vendas.',
            );

            expect(component.documentTypeInput).toBe(LegalNature.PJ);
        });

        it('should setCpfCnpjTypeInput return PJ tooltip when isPhysicalPerson falsy  and document lengh > 11 and legalNature = PF', () => {
            component.setCpfCnpjTypeInput(LegalNature.PF, '00000000000000', false);

            expect(component.documentTypeInput).toEqual('PF');
            expect(component.toolTipLabel).toEqual(
                'A conta precisa ser do mesmo CPF do titular legal da empresa, para não haver problemas nos recebimentos das vendas.',
            );

            expect(component.documentTypeInput).toBe(LegalNature.PF);
        });

        it('should setCpfCnpjTypeInput set PessoaFisica tooltip when isPhysicalPerson and document lengh is 11', () => {
            component.setCpfCnpjTypeInput(LegalNature.PF, '00000000000', true);

            expect(component.documentTypeInput).toEqual('PF');
            expect(component.toolTipLabel).toEqual(
                'A conta bancária precisa ser do CPF do responsável legal da conta PicPay.',
            );

            expect(component.documentTypeInput).toBe(LegalNature.PF);
        });

        it('should setCpfCnpjTypeInput show PessoaFisica tooltip when isPhysicalPerson is falsy but document lengh is 11', () => {
            component.setCpfCnpjTypeInput(LegalNature.PF, '00000000000', false);

            expect(component.documentTypeInput).toEqual('PF');
            expect(component.toolTipLabel).toEqual(
                'A conta bancária precisa ser do CPF do responsável legal da conta PicPay.',
            );

            expect(component.documentTypeInput).toBe(LegalNature.PF);
        });

        it('should have accountTypeCompare function', () => {
            expect(
                component.accountTypeCompare({ value: 'C', legal_nature: 'PF' }, { value: 'C', legal_nature: 'PF' }),
            ).toBe(true);

            expect(
                component.accountTypeCompare({ value: 'C', legal_nature: 'PF' }, { value: 'C', legal_nature: 'PJ' }),
            ).toBe(false);
        });
    });
});
