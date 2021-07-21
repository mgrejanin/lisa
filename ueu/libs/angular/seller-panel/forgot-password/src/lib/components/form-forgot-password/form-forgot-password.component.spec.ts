import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { MockComponents, MockModule } from 'ng-mocks';
import { of, throwError } from 'rxjs';

import { SellerPanelAuthService, SellerPanelAuthServiceMock } from '@picpay/seller-panel/auth';
import { LoadingButtonComponent, ValidationMessagesComponent } from '@picpay/seller-panel/shared';
import { validateAllFormFields } from '@picpay/angular/shared/helpers';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import {
    MockNotificationsService,
    NotificationsService,
    SnackbarTypes,
} from '@picpay/angular/shared/core/notifications';

import { FormForgotPasswordComponent } from './form-forgot-password.component';
import { GenerateNewPasswordComponent } from '../generate-new-password/generate-new-password.component';
import { ForgotPasswordComponent } from '../../pages/forgot-password/forgot-password.component';

describe('FormForgotPasswordComponent', () => {
    let component: FormForgotPasswordComponent;
    let fixture: ComponentFixture<FormForgotPasswordComponent>;
    let notificationService: NotificationsService;
    let authService: SellerPanelAuthService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([
                    { path: 'esqueci-a-senha/nova-senha', component: GenerateNewPasswordComponent },
                ]),
                HttpClientTestingModule,
                MockModule(MatFormFieldModule),
                MockModule(DesignSystemAngularModule),
            ],
            declarations: [
                GenerateNewPasswordComponent,
                ForgotPasswordComponent,
                FormForgotPasswordComponent,
                MockComponents(LoadingButtonComponent, ValidationMessagesComponent),
            ],
            providers: [
                {
                    provide: SellerPanelAuthService,
                    useClass: SellerPanelAuthServiceMock,
                },
                {
                    provide: NotificationsService,
                    useValue: new MockNotificationsService({ confirmed: true }),
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormForgotPasswordComponent);
        component = fixture.componentInstance;

        notificationService = TestBed.inject(NotificationsService);
        authService = TestBed.inject(SellerPanelAuthService);
        router = TestBed.inject(Router);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a login form', () => {
        const form = component.form;

        expect(form).toBeDefined();

        expect(form.get('cnpj')).toBeDefined();
        expect(form.get('cnpj').value).toBe('');

        expect(form.get('email')).toBeDefined();
        expect(form.get('email').value).toBe('');
    });

    it('should have requestNewPassword function (Case Success)', () => {
        const serviceSpy = spyOn(authService, 'requestNewPassword').and.returnValue(
            of({ message: 'Enviado com sucesso!' }),
        );
        const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');
        const routerSpy = spyOn(router, 'navigate');

        component.form.patchValue({
            cnpj: '21343242343242',
            email: 'mystore@mail.test',
        });

        component.onRequestPassword();

        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(component.action).toBe(false);
        expect(routerSpy).toHaveBeenCalledWith(['esqueci-a-senha/nova-senha']);
        expect(notificationServiceSpy).toHaveBeenCalledWith('Enviado com sucesso!', SnackbarTypes.DONE);
    });

    it('should have requestNewPassword function (Case Error)', () => {
        const serviceSpy = spyOn(authService, 'requestNewPassword').and.returnValue(throwError({}));
        const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');

        component.form.patchValue({
            cnpj: '21343242343242',
            email: 'mystore@mail.test',
        });

        component.onRequestPassword();

        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(component.action).toBe(false);
        expect(notificationServiceSpy).toHaveBeenCalledTimes(1);
    });

    it('should have requestNewPassword function (Case Invalid Form)', () => {
        component.form.patchValue({
            cnpj: null,
        });

        component.onRequestPassword();

        expect(validateAllFormFields).not.toBeDefined;
    });

    it('should submit form when click at c-request-password__btn-submit', () => {
        const onRequestPasswordFunctionSpy = spyOn(component, 'onRequestPassword');
        const form = fixture.debugElement.query(By.css('.f-panel-centralized__form'));
        const requestPasswordButton = form.query(By.css('.c-request-password__btn-submit')).nativeElement;

        requestPasswordButton.click();

        expect(onRequestPasswordFunctionSpy).toHaveBeenCalled();
    });
});
