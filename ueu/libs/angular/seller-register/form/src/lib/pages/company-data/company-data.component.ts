import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { customMessage, isValidCnpj } from '@picpay/angular/shared/validators';

import { NavigationRoutes } from '../../models/navigation.model';
import { SellerService } from '../../data-access/seller/seller.service';
import { SellerQuery } from '../../data-access/seller/seller.query';
import { StepService } from '../../data-access/step/step.service';
import { CompanyDataService } from '../../services/company-data/company-data.service';

import { CompanyTypes, companyTypesValues } from '../../models/company-data.model';

@Component({
    selector: 'seller-register-company-data',
    templateUrl: './company-data.component.html',
    styleUrls: ['./company-data.component.scss'],
})
export class CompanyDataComponent implements OnInit {
    title: string;
    companyDataForm: FormGroup;
    types: CompanyTypes[];
    readonly isLoading$: Observable<boolean>;

    constructor(
        private formBuilder: FormBuilder,
        private sellerService: SellerService,
        private stepService: StepService,
        private router: Router,
        private sellerQuery: SellerQuery,
        private companyDataService: CompanyDataService,
    ) {
        this.title = 'Sobre a empresa';
        this.types = companyTypesValues;
        this.isLoading$ = this.sellerQuery.isLoading$;
        this.createForm();
    }

    get formFields() {
        return this.companyDataForm.controls;
    }

    ngOnInit() {
        this.stepService.initStep({
            headerTitle: this.title,
            valueProgressBar: 6,
        });
    }

    onSubmit() {
        if (this.companyDataForm.invalid) {
            return;
        }

        this.companyDataService
            .postCompanyData(this.companyDataForm.value)
            .pipe(subscribeUntil(this))
            .subscribe(response => {
                if (response?.success) {
                    this.sellerService.updateDataSeller({
                        step: 4,
                        address: this.companyDataForm.value,
                    });

                    this.nextStep();
                }
            });
    }

    private nextStep(): void {
        this.router.navigate([`/form/${NavigationRoutes.CompanyAddress}`]);
    }

    private createForm() {
        this.companyDataForm = this.formBuilder.group({
            company_cnpj: ['', [Validators.required, customMessage(isValidCnpj(), 'CNPJ inválido!')]],
            company_social: ['', [Validators.required, Validators.maxLength(255)]],
            company_type: ['', [Validators.required]],
        });
    }
}
