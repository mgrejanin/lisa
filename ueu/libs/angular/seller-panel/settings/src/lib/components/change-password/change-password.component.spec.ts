import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SellerPanelAuthService, SellerPanelAuthServiceMock } from '@picpay/seller-panel/auth';
import { SellerPanelSharedModule } from '@picpay/seller-panel/shared';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';

import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
    let component: ChangePasswordComponent;
    let fixture: ComponentFixture<ChangePasswordComponent>;
    let authService: SellerPanelAuthService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, RouterTestingModule, HttpClientTestingModule, SellerPanelSharedModule],
            declarations: [ChangePasswordComponent],
            providers: [
                { provide: NotificationsService, useValue: new MockNotificationsService({ confirmed: true }) },
                { provide: SellerPanelAuthService, useClass: SellerPanelAuthServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangePasswordComponent);
        component = fixture.componentInstance;

        authService = TestBed.inject(SellerPanelAuthService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a change password form', () => {
        const form = component.form;

        expect(form).toBeDefined();

        expect(form.get('old_password')).toBeDefined();
        expect(form.get('password')).toBeDefined();
        expect(form.get('password_confirmation')).toBeDefined();
    });

    it('should have a change password form', () => {
        const form = component.form;
        const button = fixture.debugElement.query(By.css('.c-change-password__btn')).nativeElement;

        expect(form).toBeDefined();

        expect(form.get('old_password').value).toBe('');
        expect(form.get('password').value).toBe('');
        expect(form.get('password_confirmation').value).toBe('');
        expect(form.valid).toBe(false);
        expect(button.disabled).toBe(true);
    });

    it('should have onChangePassword function', () => {
        const form = component.form;
        const formResetSpy = spyOn(component.form, 'reset');
        const authServiceSpy = spyOn(authService, 'updatePassword').and.callThrough();

        component.form.get('old_password').patchValue('old');
        component.form.get('password').patchValue('new');
        component.form.get('password_confirmation').patchValue('new');

        fixture.detectChanges();

        component.onChangePassword();

        expect(form.valid).toBe(true);
        expect(authServiceSpy).toHaveBeenCalledWith({
            password: 'new',
            password_confirmation: 'new',
            old_password: 'old',
        });
        expect(formResetSpy).toHaveBeenCalledTimes(1);
    });

    /**
     * -> TODO <-
     * This method is under analysis, as
     * no test solution was found.
     */
    // it('should have validateAllFormFields function', () => { });
});
