import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { StepService } from '../../data-access/step/step.service';
import { StepServiceMock } from '../../data-access/step/step.service.mock';

import { SellerService } from '../../data-access/seller/seller.service';

import { PasswordService } from '../../services/password/password.service';
import { PasswordServiceMock } from '../../mocks/password.service.mock';

import { PasswordComponent } from './password.component';

describe('PasswordComponent', () => {
    let component: PasswordComponent;
    let fixture: ComponentFixture<PasswordComponent>;

    let stepService: StepService;
    let sellerService: SellerService;
    let passwordService: PasswordService;

    const mockStep = {
        headerTitle: 'Proteja sua conta',
        valueProgressBar: 10,
    };

    const mockData = {
        user_password: 'PicPay@123456',
        user_password_confirmation: 'PicPay@123456',
        terms: true,
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PasswordComponent],
            imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, DesignSystemAngularModule],
            providers: [
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                { provide: StepService, useClass: StepServiceMock },
                { provide: PasswordService, useClass: PasswordServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordComponent);
        component = fixture.componentInstance;

        stepService = TestBed.inject(StepService);
        sellerService = TestBed.inject(SellerService);
        passwordService = TestBed.inject(PasswordService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a formFields get accessor', () => {
        expect(component.formFields).toBeDefined();
    });

    it('shoud call the ngOnInit() lifecycle', () => {
        const initStepSpy = spyOn(stepService, 'initStep');

        component.ngOnInit();

        expect(initStepSpy).toHaveBeenCalledWith(mockStep);
    });

    it('should call the togglePasswordVisibility() function', () => {
        const textfield = fixture.debugElement.query(By.css('.c-section__form-input--password')).nativeElement;
        const icon = fixture.debugElement.query(By.css('.c-section__form-icon')).nativeElement;

        icon.dispatchEvent(new Event('click'));

        expect(textfield.getAttribute('type')).toEqual('password');
        expect(icon.getAttribute('svg-icon')).toEqual('interface-eye');
    });

    it('should submit form on submit button click', () => {
        const onSubmitSpy = spyOn(component, 'onSubmit');
        const button = fixture.debugElement.query(By.css('.c-footer__button--next')).nativeElement;

        button.dispatchEvent(new Event('click'));
        expect(onSubmitSpy).toHaveBeenCalled();
    });

    it('should call the onSubmit() function and return with invalid form', () => {
        const button = fixture.debugElement.query(By.css('.c-footer__button--next')).nativeElement;

        button.dispatchEvent(new Event('click'));
        expect(component.passwordForm.status).toBe('INVALID');
    });

    it('should updateDataSeller and submit form', () => {
        const postPasswordSpy = spyOn(passwordService, 'postPassword').and.callThrough();
        const updateDataSellerSpy = spyOn(sellerService, 'updateDataSeller');
        const routerSpy = spyOn(component['router'], 'navigate').and.returnValue(true);

        component.passwordForm.patchValue(mockData);
        component.onSubmit();

        expect(postPasswordSpy).toHaveBeenCalledWith(component.passwordForm.value);
        expect(updateDataSellerSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalledWith(['/form/senha']);
    });
});
