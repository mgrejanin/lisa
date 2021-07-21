import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { subscribeUntil } from '@picpay/angular/shared/helpers';

import { SellerService } from '../../data-access/seller/seller.service';
import { StepService } from '../../data-access/step/step.service';
import { PersonalAddressService } from '../../services/personal-address/personal-address.service';

import { CepResponse, CepService } from '@picpay/angular/shared/services';
import { Observable } from 'rxjs';
import { SellerQuery } from '../../data-access/seller/seller.query';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NavigationRoutes } from '../../models/navigation.model';

@Component({
    selector: 'seller-register-personal-address',
    templateUrl: './personal-address.component.html',
    styleUrls: ['./personal-address.component.scss'],
})
export class PersonalAddressComponent implements OnInit {
    title: string;
    personalAdressForm: FormGroup;
    cep: CepResponse;
    readonly isLoading$: Observable<boolean>;

    constructor(
        private formBuilder: FormBuilder,
        private sellerService: SellerService,
        private stepService: StepService,
        private cepService: CepService,
        private router: Router,
        private personalAdressService: PersonalAddressService,
        private sellerQuery: SellerQuery,
    ) {
        this.title = 'Endereço da pessoa responsável';
        this.isLoading$ = this.sellerQuery.isLoading$;
        this.createForm();
    }

    get formFields() {
        return this.personalAdressForm.controls;
    }

    ngOnInit() {
        this.stepService.initStep({
            headerTitle: this.title,
            valueProgressBar: 3,
        });
    }

    handleCep(cep: string) {
        if (this.formFields.user_address_code.invalid) {
            return;
        }

        this.sellerService.setLoading(true);

        this.cepService
            .getLocation(cep)
            .pipe(subscribeUntil(this))
            .pipe(finalize(() => this.sellerService.setLoading(false)))
            .subscribe(
                response => {
                    this.setFormData(response);
                },
                err => {
                    this.formFields.user_address_code.setErrors({ invalid: err.error });
                },
            );
    }

    disableFields(action: 'disable' | 'enable') {
        this.formFields.user_address_city[action]();
        this.formFields.user_address_state[action]();
    }

    setFormData(location: CepResponse) {
        this.personalAdressForm.patchValue({
            user_address_street: location.logradouro,
            user_address_neighbourhood: location.bairro,
            user_address_city: location.localidade,
            user_address_state: location.uf,
        });

        this.disableFields('disable');
    }

    onSubmit() {
        if (this.personalAdressForm.invalid) {
            return;
        }

        this.disableFields('enable');

        this.personalAdressService
            .postPersonalAddress(this.personalAdressForm.value)
            .pipe(subscribeUntil(this))
            .subscribe(resp => {
                if (resp?.success) {
                    this.sellerService.updateDataSeller({
                        step: 3,
                        address: this.personalAdressForm.value,
                    });

                    this.nextStep();
                }
            });
    }

    private nextStep(): void {
        this.router.navigate([`/form/${NavigationRoutes.CellValidation}`]);
    }

    private createForm() {
        this.personalAdressForm = this.formBuilder.group({
            user_address_code: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
            user_address_street: ['', [Validators.required, Validators.maxLength(255)]],
            user_address_number: ['', [Validators.required, Validators.maxLength(309)]],
            user_address_complement: ['', [Validators.maxLength(255)]],
            user_address_neighbourhood: ['', [Validators.required, Validators.maxLength(255)]],
            user_address_city: ['', [Validators.required, Validators.maxLength(255)]],
            user_address_state: ['', [Validators.required, Validators.maxLength(2)]],
        });
    }
}
