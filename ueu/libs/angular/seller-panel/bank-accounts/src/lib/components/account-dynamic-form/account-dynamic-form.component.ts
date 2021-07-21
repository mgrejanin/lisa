import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { updatedDiff } from 'deep-object-diff';
import { Observable, of } from 'rxjs';
import { pairwise, switchMap } from 'rxjs/operators';

import { SellerQuery, SellerResponse, SellerService } from '@picpay/seller-panel/services';
import {
    isEmptyObject,
    removeUndefinedNull,
    subscribeUntil,
    validateAllFormFields,
} from '@picpay/angular/shared/helpers';
import { CpfCnpjPipe } from '@picpay/angular/shared/pipes';
import { isValidCpf } from '@picpay/angular/shared/validators';

import { AccountsQuery } from '../../state/accounts/accounts.query';
import { AccountsService } from '../../state/accounts/accounts.service';
import { BanksQuery } from '../../state/banks/banks.query';
import { StepperQuery } from '../../state/stepper/stepper.query';
import { StepperService } from '../../state/stepper/stepper.service';

import { Account, AccountType, Bank, BankConfig, LegalNature } from '../../models';

@Component({
    selector: 'seller-panel-account-dynamic-form',
    templateUrl: './account-dynamic-form.component.html',
    styleUrls: ['./account-dynamic-form.component.scss'],
})
export class AccountDynamicFormComponent implements OnInit, AfterViewInit {
    form: FormGroup;
    agencyDigitDisabled: boolean;
    isIndividualEntrepreuner: boolean;
    hasDifferenceDataForm: boolean;
    initialAccountDataForm: Account;
    documentTypeInput: LegalNature;
    bankConfig: BankConfig;
    toolTipLabel: string;
    documentBackup: string;
    documentsData: SellerResponse;

    readonly isEdit$: Observable<boolean>;
    readonly bank$: Observable<Bank>;
    account$: Observable<Account>;

    @ViewChild('formElement') formElement: NgForm;

    @Output() next: EventEmitter<void>;
    @Output() previous: EventEmitter<void>;

    constructor(
        private formBuilder: FormBuilder,
        private accountsService: AccountsService,
        private accountsQuery: AccountsQuery,
        private banksQuery: BanksQuery,
        private sellerService: SellerService,
        private stepperQuery: StepperQuery,
        private stepperService: StepperService,
        private cpfCnpjPipe: CpfCnpjPipe,
        private sellerQuery: SellerQuery,
    ) {
        this.isEdit$ = this.stepperQuery.isEdit$;
        this.account$ = this.accountsQuery.currentAccount$;
        this.bank$ = this.banksQuery.selectedBank$;

        this.bankConfig = {};
        this.hasDifferenceDataForm = false;

        this.documentBackup = '';

        this.next = new EventEmitter();
        this.previous = new EventEmitter();

        this.form = this.formBuilder.group({
            id: [null],
            bank_id: [null, [Validators.required]],
            type: [{ label: null, value: null, legal_nature: null }, [Validators.required]],
            branch: [null, [Validators.required]],
            branch_digit: { value: null, disabled: true },
            account: [null, [Validators.required]],
            account_digit: [null, [Validators.required]],
            document: { value: null, disabled: true },
            main: [false, [Validators.required]],
        });
        this.documentsData = this.sellerQuery.getValue();
    }

    ngOnInit(): void {
        this.form
            .get('type')
            .valueChanges.pipe(subscribeUntil(this), pairwise<AccountType>())
            .subscribe(([prev, next]) => {
                if (!next) return;
                if (prev && prev.legal_nature == LegalNature.PF) {
                    this.documentBackup = this.form.get('document').value;
                }

                this.setDocumentInputConfig(next);

                if (next.legal_nature === LegalNature.PF) {
                    this.form.patchValue({ document: this.documentBackup });
                } else {
                    const document = this.formatDocumentValue(this.sellerService.getOrganizationDocument());

                    this.form.patchValue({
                        document,
                    });
                }
            });

        this.account$.pipe(subscribeUntil(this)).subscribe(account => {
            if (this.stepperQuery.getValue().isEdit) {
                this.initialAccountDataForm = {
                    id: account.id,
                    bank_id: account.bank_id,
                    type: account.type,
                    branch: account.branch,
                    branch_digit: account.branch_digit,
                    account: account.account,
                    account_digit: account.account_digit,
                    document: account.document,
                    main: account?.main ?? false,
                };

                this.form.patchValue({
                    id: account?.id,
                });
            }

            this.form.patchValue({
                bank_id: account.bank_id,
                type: account.type,
                branch: account.branch,
                branch_digit: account.branch_digit,
                account: account.account,
                account_digit: account.account_digit,
                document: this.formatDocumentValue(account.document),
                main: account?.main ?? false,
            });

            this.setDocumentInputConfig(account?.type);
        });

        this.bank$.pipe(subscribeUntil(this)).subscribe(bank => {
            this.form.patchValue({
                bank_id: bank.id,
            });

            this.setBankConfigValidators(bank?.form_config);
        });
    }

    ngAfterViewInit() {
        this.isEdit$
            .pipe(
                subscribeUntil(this),
                switchMap(editMode => (editMode ? this.form.valueChanges : of(false))),
            )
            .subscribe(formValue => {
                if (formValue) {
                    const currentAccountForm = formValue;
                    currentAccountForm.document = this.accountsQuery.getValue().currentAccount.document;
                    this.hasDifferenceDataForm = !isEmptyObject(
                        updatedDiff(removeUndefinedNull(this.initialAccountDataForm), currentAccountForm),
                    );
                }
            });
    }

    setCpfCnpjTypeInput(type: LegalNature, document: string, isPhysicalPerson: boolean): void {
        this.documentTypeInput = type;

        if (document.length === 11 || isPhysicalPerson) {
            this.toolTipLabel = 'A conta bancária precisa ser do CPF do responsável legal da conta PicPay.';
            return;
        }

        this.toolTipLabel =
            type === LegalNature.PF
                ? 'A conta precisa ser do mesmo CPF do titular legal da empresa, para não haver problemas nos recebimentos das vendas.'
                : 'A conta precisa ser do mesmo CNPJ da empresa, para não haver problemas nos recebimentos das suas vendas.';
    }

    setBankConfigValidators(config: BankConfig): void {
        if (!config) {
            return;
        }

        this.bankConfig = config;

        if (this.stepperQuery.getValue().isEdit) {
            this.form.registerControl('id', new FormControl(this.accountsQuery.getValue().currentAccount.id));
        } else {
            this.form.removeControl('id');
        }

        if (config?.branch_digit_enabled) {
            this.form.get('branch_digit').enable();
            this.form.get('branch_digit').setValidators(Validators.required);
        } else {
            this.form.get('branch_digit').patchValue('');
            this.form.get('branch_digit').disable();
        }
    }

    setAccountData(): void {
        this.accountsService.setCurrentAccount({
            ...this.form.value,
            document: this.getPureValueFromDocumentField(),
        });
    }

    showBanksList(): void {
        this.stepperService.updateSelectingBank(true);
    }

    onConfirmAccount(): void {
        if (this.form.valid) {
            this.setAccountData();
            this.next.emit();
        } else {
            validateAllFormFields(this.form);
        }
    }

    accountTypeCompare(firstObject: AccountType, secondObjet: AccountType) {
        return firstObject?.value === secondObjet?.value && firstObject?.legal_nature === secondObjet?.legal_nature;
    }

    getPureValueFromDocumentField(): string {
        return this.form.get('document').value ? this.form.get('document').value.replace(/[^\w\s]/gi, '') : '';
    }

    private formatDocumentValue(document: string): string {
        return this.cpfCnpjPipe.transform(document);
    }

    private setDocumentInputConfig(type: AccountType) {
        if (!type?.legal_nature) {
            return;
        }

        const inputLength = type.legal_nature === LegalNature.PJ ? 18 : 14;

        this.setCpfCnpjTypeInput(
            LegalNature[type.legal_nature],
            this.documentsData?.organization?.cpfCnpj,
            this.documentsData?.organization?.pessoaFisica,
        );

        if (type.legal_nature === LegalNature.PJ) {
            this.form.get('document').clearValidators();
            this.form.get('document').disable();
        } else {
            this.form.get('document').enable();
            this.form
                .get('document')
                .setValidators([Validators.required, Validators.minLength(inputLength), isValidCpf()]);
        }
    }
}
