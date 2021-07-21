import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApolloIcon, ApolloTextfield } from '@picpay/design-system-angular-components';
import { subscribeUntil } from '@picpay/angular/shared/helpers';
import { passwordMatchValidator } from '@picpay/angular/shared/validators';

import { NavigationRoutes } from '../../models/navigation.model';
import { SellerService } from '../../data-access/seller/seller.service';
import { SellerQuery } from '../../data-access/seller/seller.query';
import { StepService } from '../../data-access/step/step.service';
import { PasswordService } from '../../services/password/password.service';

@Component({
    selector: 'seller-register-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
    title: string;
    passwordForm: FormGroup;
    readonly isLoading$: Observable<boolean>;

    constructor(
        private formBuilder: FormBuilder,
        private sellerService: SellerService,
        private stepService: StepService,
        private router: Router,
        private sellerQuery: SellerQuery,
        private passwordService: PasswordService,
    ) {
        this.title = 'Proteja sua conta';
        this.isLoading$ = this.sellerQuery.isLoading$;
        this.createForm();
    }

    get formFields(): { [key: string]: AbstractControl } {
        return this.passwordForm.controls;
    }

    ngOnInit(): void {
        this.stepService.initStep({
            headerTitle: this.title,
            valueProgressBar: 10,
        });
    }

    togglePasswordVisibility(textfield: ApolloTextfield, icon: ApolloIcon): void {
        const type = textfield.type === 'password' ? 'text' : 'password';
        const svg = icon.svgIcon === 'interface-eye' ? 'interface-eye-slash' : 'interface-eye';

        textfield.type = type;
        icon.svgIcon = svg;
    }

    onSubmit(): void {
        if (this.passwordForm.invalid) {
            return;
        }

        this.passwordService
            .postPassword(this.passwordForm.value)
            .pipe(subscribeUntil(this))
            .subscribe(response => {
                if (response?.success) {
                    this.sellerService.updateDataSeller({
                        step: 6,
                        token: response?.detail?.access?.access_token,
                        password: this.passwordForm.value,
                    });

                    this.nextStep();
                }
            });
    }

    // TODO: Trocar rota quando a tela seguinte for criada
    private nextStep(): void {
        this.router.navigate([`/form/${NavigationRoutes.Password}`]);
    }

    private createForm(): void {
        this.passwordForm = this.formBuilder.group(
            {
                user_password: ['', [Validators.required, Validators.minLength(8)]],
                user_password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
                terms: [false, [Validators.requiredTrue]],
            },
            {
                validators: passwordMatchValidator('user_password', 'user_password_confirmation'),
            },
        );
    }
}
