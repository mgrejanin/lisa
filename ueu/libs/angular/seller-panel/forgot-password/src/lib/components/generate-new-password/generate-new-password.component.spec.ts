import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { MockComponents, MockModule } from 'ng-mocks';
import { of, throwError } from 'rxjs';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SellerPanelAuthService, SellerPanelAuthServiceMock } from '@picpay/seller-panel/auth';
import { LoginComponent } from '@picpay/seller-panel/login';
import { LoadingButtonComponent, ValidationMessagesComponent } from '@picpay/seller-panel/shared';
import {
    MockNotificationsService,
    NotificationsService,
    SnackbarTypes,
} from '@picpay/angular/shared/core/notifications';
import { validateAllFormFields } from '@picpay/angular/shared/helpers';

import { GenerateNewPasswordComponent } from './generate-new-password.component';
import { ForgotPasswordComponent } from '../../pages/forgot-password/forgot-password.component';

describe('GenerateNewPasswordComponent', () => {
    let component: GenerateNewPasswordComponent;
    let fixture: ComponentFixture<GenerateNewPasswordComponent>;
    let notificationService: NotificationsService;
    let authService: SellerPanelAuthService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([
                    { path: 'login', component: LoginComponent },
                    { path: 'esqueci-a-senha', component: ForgotPasswordComponent },
                ]),
                MockModule(DesignSystemAngularModule),
                HttpClientTestingModule,
                MockModule(MatFormFieldModule),
            ],
            declarations: [
                GenerateNewPasswordComponent,
                LoginComponent,
                ForgotPasswordComponent,
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
        fixture = TestBed.createComponent(GenerateNewPasswordComponent);
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

        expect(form.get('password_recovery_key')).toBeDefined();
        expect(form.get('password_recovery_key').value).toBe('');

        expect(form.get('password')).toBeDefined();
        expect(form.get('password').value).toBe('');

        expect(form.get('password_confirmation')).toBeDefined();
        expect(form.get('password_confirmation').value).toBe('');
    });

    it('should have onGenerateNewPassword function (Case Success)', () => {
        const serviceSpy = spyOn(authService, 'changeLostPassword').and.returnValue(of(null));
        const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');
        authService.sellerEmail = 'myBusiness@mail.com';

        component.form.patchValue({
            password_recovery_key: 'Oa3t32B23R3d42',
            password: 'newPassw0rd',
            password_confirmation: 'newPassw0rd',
        });

        fixture.detectChanges();

        component.onGenerateNewPassword();

        expect(component.form).toBeTruthy();
        expect(component.form.valid).toBeTruthy();

        expect(component.form.get('password_recovery_key').value).toEqual('Oa3t32B23R3d42');
        expect(component.form.get('password').value).toEqual('newPassw0rd');
        expect(component.form.get('password_confirmation').value).toEqual('newPassw0rd');
        expect(serviceSpy).toHaveBeenCalledWith(component.form.value);
        expect(notificationServiceSpy).toHaveBeenCalledWith(
            'Sua senha foi alterada com sucesso! Basta efetuar o login com a nova senha.',
            SnackbarTypes.INFO,
        );
    });

    it('should have onGenerateNewPassword function (Case Error)', () => {
        const serviceSpy = spyOn(authService, 'changeLostPassword').and.returnValue(throwError({}));
        const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');
        authService.sellerEmail = 'myBusiness@mail.com';

        component.form.patchValue({
            password_recovery_key: 'Oa3t32B23R3d42',
            password: 'newPassw0rd',
            password_confirmation: 'newPassw0rd',
        });

        component.onGenerateNewPassword();

        expect(serviceSpy).toHaveBeenCalledTimes(1);
        expect(component.action).toBe(false);
        expect(notificationServiceSpy).toHaveBeenCalledTimes(1);
    });

    it('should have onGenerateNewPassword function (Case Invalid E-mail)', () => {
        const notificationServiceSpy = spyOn(notificationService, 'openSnackbar');
        const routerSpy = spyOn(router, 'navigate');
        authService.sellerEmail = undefined;

        component.form.patchValue({
            password_recovery_key: 'Oa3t32B23R3d42',
            password: 'newPassw0rd',
            password_confirmation: 'newPassw0rd',
        });

        component.onGenerateNewPassword();

        expect(routerSpy).toHaveBeenCalledWith(['/esqueci-a-senha']);
        expect(notificationServiceSpy).toHaveBeenCalledWith(
            'Ops. Faltou seu email! Precisamos que você preencha o email para enviarmos o código de recuperação.',
            SnackbarTypes.INFO,
        );
    });

    it('should have onGenerateNewPassword function (Case Invalid Form)', () => {
        component.form.patchValue({
            password_recovery_key: null,
        });

        component.onGenerateNewPassword();

        expect(validateAllFormFields).not.toBeDefined;
    });

    it('should submit form when click at c-generate-new-password__btn-submit', () => {
        const onRequestPasswordFunctionSpy = spyOn(component, 'onGenerateNewPassword');
        const form = fixture.debugElement.query(By.css('.f-panel-centralized__form'));
        const requestPasswordButton = form.query(By.css('.c-generate-new-password__btn-submit')).nativeElement;

        requestPasswordButton.click();

        expect(onRequestPasswordFunctionSpy).toHaveBeenCalled();
    });
});
