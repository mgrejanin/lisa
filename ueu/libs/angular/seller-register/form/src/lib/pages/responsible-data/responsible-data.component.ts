import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isValidBirth, validDate } from '@picpay/seller-register/shared';
import { Observable, throwError } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ResponsibleDataService } from '../../services/responsible-data/responsible-data.service';
import { Responsible } from '../../models/responsible-data.model';
import {
    getDataLikeYearMonthDay,
    getNumberWithoutWhiteSpace,
    getStringWithoutSpecialCharacters,
} from '../../helpers/formatter';
import { Router } from '@angular/router';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { customMessage, isValidCpf } from '@picpay/angular/shared/validators';
import { SellerQuery } from '../../data-access/seller/seller.query';
import { StepService } from '../../data-access/step/step.service';
import { SellerService } from '../../data-access/seller/seller.service';
import { ObjectIsEqual } from '../../helpers/validators';
import { NavigationRoutes } from '../../models/navigation.model';

@Component({
    selector: 'seller-register-responsible-data',
    templateUrl: './responsible-data.component.html',
    styleUrls: ['./responsible-data.component.scss'],
})
export class ResponsibleDataComponent implements OnInit {
    title: string;
    responsibleForm: FormGroup;
    private dataResponsible: Responsible;
    readonly isLoading$: Observable<boolean>;
    private readonly sellerResponsible$: Observable<Responsible>;

    constructor(
        private formBuilder: FormBuilder,
        private sellerService: SellerService,
        private stepService: StepService,
        private reCaptchaV3Service: ReCaptchaV3Service,
        private responsibleDataService: ResponsibleDataService,
        private router: Router,
        private sellerQuery: SellerQuery,
    ) {
        this.title = 'Dados da pessoa responsável';
        this.sellerResponsible$ = this.sellerQuery.sellerResponsible$;
        this.isLoading$ = this.sellerQuery.isLoading$;
        this.creatForm();
    }

    ngOnInit(): void {
        this.stepService.initStep({
            headerTitle: this.title,
        });

        this.handleDataReturnSellerResponsible();
    }

    onSubmit(): void {
        if (this.responsibleForm.invalid) {
            return;
        }

        if (!ObjectIsEqual(this.dataResponsible, this.responsibleForm.value)) {
            this.onReCaptchaAction();
        } else {
            this.nextStep();
        }
    }

    private onReCaptchaAction(): void {
        this.reCaptchaV3Service
            .execute('startRequest')
            .pipe(subscribeUntil(this))
            .subscribe(
                (token: string) => {
                    this.sendResponsibleData(token);
                },
                error => {
                    throwError(error);
                },
            );
    }

    private sendResponsibleData(recaptcha: string): void {
        const responsibleData: Responsible = {
            ...this.responsibleForm.value,
            user_document: getStringWithoutSpecialCharacters(this.field.user_document.value),
            user_birthday: getDataLikeYearMonthDay(this.field.user_birthday.value),
            user_cell_number: getNumberWithoutWhiteSpace(this.field.user_cell_number.value),
            recaptcha,
        };

        this.responsibleDataService
            .postResponsibleData(responsibleData)
            .pipe(subscribeUntil(this))
            .subscribe(resp => {
                if (resp?.success) {
                    this.setDataSellerAndNextStep(resp?.detail?.hash);
                }
            });
    }

    private handleDataReturnSellerResponsible(): void {
        this.sellerResponsible$.pipe(subscribeUntil(this)).subscribe(dataResponsible => {
            if (dataResponsible) {
                this.responsibleForm.patchValue(dataResponsible);
                this.dataResponsible = dataResponsible;
            }
        });
    }

    private setDataSellerAndNextStep(hash?: string): void {
        this.sellerService.updateDataSeller({
            step: 2,
            hash,
            responsible: this.responsibleForm.value,
        });

        this.nextStep();
    }

    private nextStep(): void {
        this.router.navigate([`/form/${NavigationRoutes.PersonalAddress}`]);
    }

    private creatForm(): void {
        this.responsibleForm = this.formBuilder.group({
            user_name: ['', Validators.required],
            user_email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                    customMessage(Validators.maxLength(45), 'Seu email deve ter no máximo 45 caracteres!'),
                ],
            ],
            user_document: [
                '',
                [
                    Validators.required,
                    customMessage(Validators.minLength(14), 'O tamanho mínimo deve ser 11 caracteres!'),
                    customMessage(isValidCpf(), 'O CPF informado é inválido!'),
                ],
            ],
            user_cell_number: [
                '',
                [Validators.required, customMessage(Validators.minLength(15), 'O celular deve ter 11 digítos!')],
            ],
            user_birthday: [
                '',
                [
                    Validators.required,
                    customMessage(Validators.minLength(10), 'Sua data de nascimento deve ter 8 caracteres!'),
                    customMessage(validDate(), 'Data de nascimento inválida'),
                    customMessage(isValidBirth(), 'A idade mínima para cadastro é 18 anos'),
                ],
            ],
            user_mother: ['', Validators.required],
            user_phone: [''],
            recaptcha: [''],
        });
    }

    private get field() {
        return this.responsibleForm.controls;
    }
}
