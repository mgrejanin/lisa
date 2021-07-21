import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerPanelAuthService } from '@picpay/seller-panel/auth';

import { getErrorMessage } from '@picpay/seller-panel/helpers';
import { validateAllFormFields } from '@picpay/angular/shared/helpers';

import { matchOtherValidator } from '@picpay/seller-panel/shared';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

@Component({
    selector: 'seller-panel-generate-new-password',
    templateUrl: './generate-new-password.component.html',
    styleUrls: ['./generate-new-password.component.scss'],
})
export class GenerateNewPasswordComponent {
    form: FormGroup;
    action = false;

    constructor(
        private auth: SellerPanelAuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private notificationService: NotificationsService,
    ) {
        this.form = this.formBuilder.group(
            {
                password_recovery_key: ['', [Validators.required]],
                password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]],
                password_confirmation: ['', [Validators.required]],
            },
            { validators: matchOtherValidator('password', 'password_confirmation', 'senhas') },
        );
    }

    onGenerateNewPassword() {
        if (this.form.valid) {
            this.action = true;

            if (this.auth.sellerEmail) {
                const body = this.form.value;

                body.email = this.auth.sellerEmail;

                this.auth.changeLostPassword(body).subscribe(
                    () => {
                        this.action = false;
                        this.notificationService.openSnackbar(
                            'Sua senha foi alterada com sucesso! Basta efetuar o login com a nova senha.',
                            SnackbarTypes.INFO,
                        );

                        // tslint:disable-next-line:no-floating-promises
                        this.router.navigate(['/login']);
                    },
                    error => {
                        this.action = false;
                        this.notificationService.openSnackbar(getErrorMessage(error), SnackbarTypes.ERROR);
                    },
                );
            } else {
                // tslint:disable-next-line:no-floating-promises
                this.router.navigate(['/esqueci-a-senha']);
                this.notificationService.openSnackbar(
                    'Ops. Faltou seu email! Precisamos que você preencha o email para enviarmos o código de recuperação.',
                    SnackbarTypes.INFO,
                );
            }
        } else {
            validateAllFormFields(this.form);
        }
    }
}
