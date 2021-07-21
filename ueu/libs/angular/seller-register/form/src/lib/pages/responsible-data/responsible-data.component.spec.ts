import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { FieldValidationComponent } from '@picpay/seller-register/shared';

import { MockComponents, MockModule } from 'ng-mocks';
import { NgxMaskModule } from 'ngx-mask';
import { StepService } from '../../data-access/step/step.service';
import { StepServiceMock } from '../../data-access/step/step.service.mock';
import { ReCaptchaV3Service, RECAPTCHA_LANGUAGE, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { ResponsibleDataComponent } from './responsible-data.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { SellerService } from '../../data-access/seller/seller.service';
import { Router } from '@angular/router';

describe('ResponsibleDataComponent', () => {
    let component: ResponsibleDataComponent;
    let stepService: StepService;
    let fixture: ComponentFixture<ResponsibleDataComponent>;
    let sellerService: SellerService;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ResponsibleDataComponent, MockComponents(FieldValidationComponent)],
            imports: [
                ReactiveFormsModule,
                DesignSystemAngularModule,
                MockModule(MatFormFieldModule),
                NgxMaskModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                ReCaptchaV3Service,
                { provide: RECAPTCHA_V3_SITE_KEY, useValue: '' },
                {
                    provide: RECAPTCHA_LANGUAGE,
                    useValue: 'pt-BR',
                },
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                { provide: StepService, useClass: StepServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ResponsibleDataComponent);
        stepService = TestBed.inject(StepService);
        component = fixture.componentInstance;
        sellerService = TestBed.inject(SellerService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have ngOnInit', () => {
        const initStepSpy = spyOn(stepService, 'initStep');

        const stepMock = {
            headerTitle: 'Dados da pessoa responsável',
        };

        component.ngOnInit();

        expect(initStepSpy).toHaveBeenCalledWith(stepMock);
    });

    it('should have onSubmit function', () => {
        expect(component.onSubmit).toBeTruthy();
    });

    it('Should create an H1 with the text', () => {
        const title = fixture.debugElement.query(By.css('.c-section__title')).nativeElement as HTMLHeadingElement;
        expect(title.textContent.trim()).toEqual('Dados da pessoa responsável');
    });

    it('should have disclaimer', () => {
        const disclaimer = fixture.debugElement.query(By.css('.feedback-card')).nativeElement;
        expect(disclaimer).toBeTruthy();
    });

    it('should have a responsible form', () => {
        const form = component.responsibleForm;

        expect(form).toBeDefined();

        expect(form.get('user_name')).toBeDefined();
        expect(form.get('user_name').value).toBe('');

        expect(form.get('user_email')).toBeDefined();
        expect(form.get('user_email').value).toBe('');

        expect(form.get('user_document')).toBeDefined();
        expect(form.get('user_document').value).toBe('');

        expect(form.get('user_cell_number')).toBeDefined();
        expect(form.get('user_cell_number').value).toBe('');

        expect(form.get('user_birthday')).toBeDefined();
        expect(form.get('user_birthday').value).toBe('');

        expect(form.get('user_mother')).toBeDefined();
        expect(form.get('user_mother').value).toBe('');
    });

    it('should back button', () => {
        const btnBack = fixture.debugElement.query(By.css('.c-footer__button--previous'));
        const btnBackElement = btnBack.nativeElement as HTMLButtonElement;

        // checking text
        expect(btnBackElement.textContent.trim()).toBe('Voltar');

        // checking route
        const routerLink = btnBackElement.getAttribute('ng-reflect-router-link');
        expect(routerLink).toBe('/form/dicas');
    });

    it('should submit form when click at next button', () => {
        const btnContinue = fixture.debugElement.query(By.css('.c-footer__button--next'));
        const btnContinueElement = btnContinue.nativeElement as HTMLButtonElement;

        // checking text
        expect(btnContinueElement.textContent.trim()).toBe('Continuar');

        // checking click
        const onSubmitSpy = spyOn(component, 'onSubmit');
        btnContinueElement.click();
        expect(onSubmitSpy).toHaveBeenCalled();
    });

    it('should call the onSubmit() function and return with invalid form', () => {
        const btnContinue = fixture.debugElement.query(By.css('.c-footer__button--next'));
        const btnContinueElement = btnContinue.nativeElement as HTMLButtonElement;

        btnContinueElement.click();
        expect(component.responsibleForm.status).toBe('INVALID');
    });

    it('should call the onSubmit() function and verify if dataResponsible is equals a data-access', () => {
        const btnContinue = fixture.debugElement.query(By.css('.c-footer__button--next'));
        const btnContinueElement = btnContinue.nativeElement as HTMLButtonElement;

        sellerService.updateDataSeller({
            step: 1,
            responsible: {
                user_name: 'User Test',
                user_email: 'email@test.com',
                user_cell_number: '(99) 99999-9999',
                user_birthday: '01/01/01',
                user_document: '12345678901',
                user_mother: 'Mae Teste',
                recaptcha: '',
            },
        });

        btnContinueElement.click();
    });

    it('should call nextStep() funtion', () => {
        const routerSpy = spyOn(router, 'navigate');
        component['nextStep']();

        expect(routerSpy).toHaveBeenLastCalledWith(['/form/endereco-responsavel']);
    });

    it('should have field() function', () => {
        expect(component['field']).toBeTruthy();
    });
});
