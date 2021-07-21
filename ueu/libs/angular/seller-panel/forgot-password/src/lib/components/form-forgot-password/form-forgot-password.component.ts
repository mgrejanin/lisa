import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SellerPanelAuthService } from '@picpay/seller-panel/auth';
import { EventTracking } from '@picpay/event-tracking';
import { getErrorMessage } from '@picpay/seller-panel/helpers';
import { validateAllFormFields } from '@picpay/angular/shared/helpers';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';

@Component({
    selector: 'seller-panel-request-password',
    templateUrl: './form-forgot-password.component.html',
    styleUrls: ['./form-forgot-password.component.scss'],
})
export class FormForgotPasswordComponent implements OnDestroy {
    action = false;
    form: FormGroup;
    secondsNextRequest = 0;
    private unsubscribe$: Subject<void>;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private auth: SellerPanelAuthService,
        private notificationService: NotificationsService,
    ) {
        this.unsubscribe$ = new Subject();
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            cnpj: ['', [Validators.required, Validators.maxLength(18)]],
        });
    }

    onRequestPassword() {
        if (this.form.valid) {
            this.action = true;

            this.auth
                .requestNewPassword(this.form.value)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                    success => {
                        this.action = false;
                        this.notificationService.openSnackbar(success.message, SnackbarTypes.DONE);

                        // tslint:disable-next-line: no-floating-promises
                        this.router.navigate(['esqueci-a-senha/nova-senha']);
                    },
                    error => {
                        this.action = false;
                        this.notificationService.openSnackbar(getErrorMessage(error), SnackbarTypes.ERROR);
                    },
                );
        } else {
            validateAllFormFields(this.form);
        }

        const { email, cnpj } = this.form.value;

        EventTracking.track('User Clicked', {
            email,
            cnpj,
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User clicked',
            event_label: 'Access Recovery Requested',
        });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
