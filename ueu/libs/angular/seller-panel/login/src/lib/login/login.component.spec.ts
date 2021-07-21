import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponents, MockModule } from 'ng-mocks';
import { ReCaptchaV3Service, RECAPTCHA_LANGUAGE, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { of } from 'rxjs';

import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { SellerPanelAuthService, SellerPanelAuthServiceMock } from '@picpay/seller-panel/auth';
import { LoadingButtonComponent, ValidationMessagesComponent } from '@picpay/seller-panel/shared';
import { MenuService, MenuServiceMock } from '@picpay/ui/layouts';
import { NgxZendeskWebwidgetServiceMock } from '@picpay/angular/shared/helpers';
import { NgxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

import { LoginComponent } from './login.component';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: SellerPanelAuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                RouterTestingModule,
                HttpClientTestingModule,
                MockModule(DesignSystemAngularModule),
                MockModule(MatFormFieldModule),
            ],
            declarations: [LoginComponent, MockComponents(LoadingButtonComponent, ValidationMessagesComponent)],
            providers: [
                ReCaptchaV3Service,
                {
                    provide: NgxZendeskWebwidgetService,
                    useClass: NgxZendeskWebwidgetServiceMock,
                },
                { provide: RECAPTCHA_V3_SITE_KEY, useValue: '' }, // environment.reCaptchaKey
                {
                    provide: RECAPTCHA_LANGUAGE,
                    useValue: 'pt-BR',
                },
                {
                    provide: SellerPanelAuthService,
                    useClass: SellerPanelAuthServiceMock,
                },
                {
                    provide: NotificationsService,
                    useValue: new MockNotificationsService({ confirmed: true }),
                },
                {
                    provide: MenuService,
                    useClass: MenuServiceMock,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        authService = TestBed.inject(SellerPanelAuthService);

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

        expect(form.get('password')).toBeDefined();
        expect(form.get('password').value).toBe('');
    });

    it('should have onLogin function', () => {
        const serviceSpy = spyOn(authService, 'login').and.returnValue(of(null));
        component.form.get('cnpj').patchValue('21343242343242');
        component.form.get('email').patchValue('mystore@mail.test');
        component.form.get('password').patchValue('newPassw0rd!');

        fixture.detectChanges();

        component.onLogin('recaptchaKey');

        expect(component.form).toBeTruthy();
        expect(component.form.valid).toBeTruthy();
        expect(component.form.get('cnpj').value).toEqual('21343242343242');
        expect(component.form.get('email').value).toEqual('mystore@mail.test');
        expect(component.form.get('password').value).toEqual('newPassw0rd!');
        expect(serviceSpy).toHaveBeenCalledWith({
            email: 'mystore@mail.test',
            password: 'newPassw0rd!',
            cnpj: '21343242343242',
            recaptcha: 'recaptchaKey',
            trackingToken: null,
        });
    });

    it('should submit form when click at c-login__btn-submit', () => {
        const onLoginFunctionSpy = spyOn(component, 'onReCaptchaAction');
        const form = fixture.debugElement.query(By.css('.f-panel-centralized__form'));
        const loginInput = form.query(By.css('.c-login__btn-submit')).nativeElement;

        loginInput.click();

        expect(onLoginFunctionSpy).toHaveBeenCalled();
    });
});
