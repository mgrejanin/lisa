import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subject, throwError, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SellerPanelAuthService, Login, LoginResponse } from '@picpay/seller-panel/auth';
import { getErrorMessage } from '@picpay/seller-panel/helpers';
import { NotificationsService, SnackbarTypes } from '@picpay/angular/shared/core/notifications';
import { validateAllFormFields } from '@picpay/angular/shared/helpers';
import { EventTracking } from '@picpay/event-tracking';

import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

@Component({
    selector: 'seller-panel-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
    form: FormGroup;
    loginAction = false;
    showHeader = true;

    private unsubscribe$: Subject<void>;

    constructor(
        private auth: SellerPanelAuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private notificationService: NotificationsService,
        private reCaptchaV3Service: ReCaptchaV3Service,
        private zendeskService: NgxZendeskWebwidgetService,
    ) {
        this.form = this.formBuilder.group({
            cnpj: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(45)]],
            password: ['', [Validators.required, Validators.maxLength(255)]],
        });

        this.unsubscribe$ = new Subject();
    }

    onReCaptchaAction(): void {
        this.loginAction = true;

        if (this.form.valid) {
            this.reCaptchaV3Service
                .execute('login')
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                    token => {
                        this.onLogin(token);
                    },
                    error => {
                        this.notificationService.openSnackbar(
                            'Um erro ocorreu na chamada do recaptcha!',
                            SnackbarTypes.ERROR,
                        );
                        this.loginAction = false;
                        throwError(error);
                    },
                );
        } else {
            validateAllFormFields(this.form);
            this.loginAction = false;
        }
    }

    onLogin(recaptcha: string): void {
        if (this.form.valid && recaptcha) {
            const body: Login = this.form.value;

            body.cnpj = body.cnpj.replace(/\D/g, '');
            body.trackingToken = localStorage.getItem('evt_token');
            body.recaptcha = recaptcha;

            this.auth
                .login(body)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                    async (data: LoginResponse) => {
                        this.notificationService;
                        // Envia o id do usuário logado para a biblioteca de Event Tracking,
                        // para que os proximos eventos sejam identificados corretamente.
                        EventTracking.login(data?.seller.organization.id.toString());
                        this.handleSignUpTrack();

                        this.zendeskAddEmailAfterLogin(data?.seller.organization.email);
                        this.loginAction = false;
                        await this.router.navigate(['/']);
                    },
                    error => {
                        this.notificationService.openSnackbar(getErrorMessage(error), SnackbarTypes.ERROR);
                        this.loginAction = false;
                    },
                );
        } else {
            validateAllFormFields(this.form);
        }
    }

    private async zendeskAddEmailAfterLogin(data: string): Promise<void> {
        await this.zendeskService.zE('webWidget', 'prefill', {
            email: {
                value: data,
                readOnly: true,
            },
        });
    }

    async onBoardingRedirectifNotCompleted(onboardingCompleted: boolean) {
        if (!onboardingCompleted) {
            this.auth.clearLocalStorage();
            this.notificationService.openSnackbar(
                'Vamos solicitar que digite novamente os dados de acesso para completar o seu cadastro.',
                SnackbarTypes.INFO,
            );
            timer(7000).subscribe(() => {
                return window.location.replace('https://lojista.picpay.com/login');
            });
        }
    }

    private handleSignUpTrack(): void {
        EventTracking.track('Signed Up', {
            hit_type: 'event',
            event_category: 'clicked',
            event_action: 'User cliked',
            event_label: 'Signed up',
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
