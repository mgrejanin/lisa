import { Component, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SellerPanelAuthService } from '@picpay/seller-panel/auth';
import { matchOtherValidator } from '@picpay/seller-panel/shared';
import { validateAllFormFields } from '@picpay/angular/shared/helpers';
import { EventTrackingService } from '@picpay/seller-panel/services';

@Component({
    selector: 'seller-panel-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnDestroy {
    changingPassword = false;
    form: FormGroup;

    // "old_password": "<string>",
    // "password": "<string>",
    // "password_confirmation": "<string>"

    @ViewChild('formElement') formElement: NgForm;

    private readonly unsubscribe$: Subject<void>;

    constructor(
        private formBuilder: FormBuilder,
        private auth: SellerPanelAuthService,
        private eventTracking: EventTrackingService,
    ) {
        this.form = this.formBuilder.group(
            {
                old_password: new FormControl('', [Validators.required]),
                password: new FormControl('', [Validators.required]),
                password_confirmation: new FormControl('', [Validators.required]),
            },
            { validators: matchOtherValidator('password', 'password_confirmation', 'senhas') },
        );
        this.unsubscribe$ = new Subject();
    }

    onChangePassword() {
        if (this.form.invalid) {
            validateAllFormFields(this.form);
        }

        const body = this.form.value;

        this.changingPassword = true;

        this.auth
            .updatePassword(body)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                () => {
                    this.eventTracking.eventTrackingUserCliked(
                        'ALTERAR_SENHA2',
                        'configuracoes/alterar-senha',
                        window,
                        document,
                    );
                    this.changingPassword = false;
                },
                () => {
                    this.changingPassword = false;
                },
                () => {
                    this.formElement.resetForm();
                },
            );
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
