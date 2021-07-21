import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { Observable } from 'rxjs';
import { SellerQuery, StepService } from '../../data-access';
import { NavigationRoutes } from '../../models/navigation.model';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';
import { CompanyLogoNameService } from '../../services/company-logo-name/company-logo-name.service';

@Component({
    selector: 'seller-register-company-logo-name',
    templateUrl: './company-logo-name.component.html',
    styleUrls: ['./company-logo-name.component.scss'],
})
export class CompanyLogoNameComponent implements OnInit {
    title: string;
    businessAvatar: string;
    companyDataForm: FormGroup;
    readonly isLoading$: Observable<boolean>;
    readonly fullAddressSeller$: Observable<string>;

    constructor(
        private formBuilder: FormBuilder,
        private stepService: StepService,
        private sellerQuery: SellerQuery,
        private router: Router,
        private notificationService: NotificationsService,
        private companyLogoNameService: CompanyLogoNameService,
    ) {
        this.title = 'Sua empresa no PicPay';
        this.fullAddressSeller$ = this.sellerQuery.fullAddressSeller$;
        this.isLoading$ = this.sellerQuery.isLoading$;
        this.createForm();
    }

    ngOnInit(): void {
        this.stepService.initStep({
            headerTitle: this.title,
            valueProgressBar: 2,
        });
    }

    public onSubmit(): void {
        if (this.companyDataForm.invalid) {
            return;
        }

        this.companyLogoNameService
            .postCompanyLogoName(this.companyDataForm.value)
            .pipe(subscribeUntil(this))
            .subscribe(resp => {
                if (resp?.success) {
                    this.nextStep();
                }
            });
    }

    public onFileSelect(company_logo: File): void {
        const reader = new FileReader();
        reader.readAsDataURL(company_logo);

        reader.onload = (event: ProgressEvent<FileReader>) => {
            this.businessAvatar = event.target.result as string;
        };

        this.companyDataForm.patchValue({ company_logo });
    }

    public onFileSelectError(error: string): void {
        this.notificationService.openSnackbar(error, SnackbarTypes.ERROR);
    }

    private nextStep(): void {
        this.router.navigate([`/form/${NavigationRoutes.CompanyLogoName}`]);
    }

    private createForm(): void {
        this.companyDataForm = this.formBuilder.group({
            company_logo: [null],
            company_display: [null, [Validators.required]],
        });
    }

    get formFields() {
        return this.companyDataForm.controls;
    }
}
