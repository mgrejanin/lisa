import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { NgxMaskModule } from 'ngx-mask';
import { of } from 'rxjs';
import { FirstNamePipe } from '../../pipes/first-name/first-name.pipe';
import { SellerQuery } from '../../data-access/seller/seller.query';
import { StepService } from '../../data-access/step/step.service';
import { StepServiceMock } from '../../data-access/step/step.service.mock';

import { CellValidationComponent } from './cell-validation.component';

describe('CellValidationComponent', () => {
    let component: CellValidationComponent;
    let stepService: StepService;
    let sellerQuery: SellerQuery;
    let fixture: ComponentFixture<CellValidationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CellValidationComponent, FirstNamePipe],
            imports: [
                ReactiveFormsModule,
                DesignSystemAngularModule,
                NgxMaskModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
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
        fixture = TestBed.createComponent(CellValidationComponent);
        stepService = TestBed.inject(StepService);
        sellerQuery = TestBed.inject(SellerQuery);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Layout
    it('should create an H1 with the text', () => {
        const title = fixture.debugElement.query(By.css('.c-section__title')).nativeElement as HTMLHeadingElement;
        expect(title.textContent.trim()).toEqual(component.title);
    });

    it('should display cellSeller$ description', (done: jest.DoneCallback) => {
        const title = fixture.debugElement.query(By.css('.c-section__body-description'))
            .nativeElement as HTMLHeadingElement;

        Object.defineProperty(component, 'cellSeller$', { value: of('(99) 99999-9999') });
        fixture.detectChanges();

        component.cellSeller$.subscribe((value: string) => {
            expect(title.textContent.trim()).toContain(value);
            done();
        });
    });

    it('should display nameSeller$ description', (done: jest.DoneCallback) => {
        const title = fixture.debugElement.query(By.css('.c-section__body-description'))
            .nativeElement as HTMLHeadingElement;

        Object.defineProperty(component, 'nameSeller$', { value: of('Maria') });
        fixture.detectChanges();

        component.nameSeller$.subscribe((value: string) => {
            expect(title.textContent.trim()).toContain(value);
            done();
        });
    });

    it('should btnResend be disabled when resendCode is false', () => {
        const btnResend = fixture.debugElement.query(By.css('.c-section__body-resend__button'));
        const btnResendElement = btnResend.nativeElement as HTMLButtonElement;

        component.resendCode = false;
        fixture.detectChanges();

        expect(btnResendElement.disabled).toBe(true);
        expect(btnResendElement.textContent.trim()).toContain('Não recebeu? Aguarde ');
    });

    it('should btnResend be enabled when resendCode is true', () => {
        const btnResend = fixture.debugElement.query(By.css('.c-section__body-resend__button'));
        const btnResendElement = btnResend.nativeElement as HTMLButtonElement;

        component.resendCode = true;
        fixture.detectChanges();

        expect(btnResendElement.disabled).toBe(false);
        expect(btnResendElement.textContent.trim()).toBe('Reenviar código');
    });

    it('should bind resendSMS on btnResend click', () => {
        const btnResend = fixture.debugElement.query(By.css('.c-section__body-resend__button'));
        const btnResendElement = btnResend.nativeElement as HTMLButtonElement;
        const resendSMSSpy = spyOn(component, 'resendSMS');

        btnResendElement.click();

        expect(resendSMSSpy).toHaveBeenCalledTimes(1);
        expect(resendSMSSpy).toHaveBeenCalledWith(true);
    });

    it('should have a cell form', () => {
        const form = component.cellForm;

        expect(form).toBeDefined();

        expect(form.get('user_code')).toBeDefined();
        expect(form.get('user_code').value).toBe('');
    });

    it('should have back button', () => {
        const btnBack = fixture.debugElement.query(By.css('.c-footer__button--previous'));
        const btnBackElement = btnBack.nativeElement as HTMLButtonElement;

        expect(btnBackElement.textContent.trim()).toBe('Voltar');

        const routerLink = btnBackElement.getAttribute('ng-reflect-router-link');
        expect(routerLink).toBe('/form/responsavel');
    });

    it('should submit form when click at next button', () => {
        const btnContinue = fixture.debugElement.query(By.css('.c-footer__button--next'));
        const btnContinueElement = btnContinue.nativeElement as HTMLButtonElement;

        expect(btnContinueElement.textContent.trim()).toBe('Continuar');

        const onSubmitSpy = spyOn(component, 'onSubmit');
        btnContinueElement.click();

        expect(component.cellForm.status).toBe('INVALID');
        expect(onSubmitSpy).toHaveBeenCalled();
    });

    // Component
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have resendCode', () => {
        expect(component.resendCode).toBe(false);
    });

    it('should have title', () => {
        expect(component.title).toBeTruthy();
    });

    it('should have displayTimer$', () => {
        expect(component.displayTimer$).toBeTruthy();
    });

    it('should have nameSeller$ observable', () => {
        expect(component.nameSeller$).toBeDefined();
        expect(component.nameSeller$).toEqual(sellerQuery.nameSeller$);
    });

    it('should have cellSeller$ observable', () => {
        expect(component.cellSeller$).toBeDefined();
        expect(component.cellSeller$).toEqual(sellerQuery.cellSeller$);
    });

    it('should have ngOnInit', () => {
        expect(component.ngOnInit).toBeTruthy();
    });

    it('shoud call initStep on ngOnInit', () => {
        const initStepSpy = spyOn(stepService, 'initStep');

        const stepMock = {
            headerTitle: 'Verificação do celular',
            valueProgressBar: 2,
        };

        component.ngOnInit();

        expect(initStepSpy).toHaveBeenCalledWith(stepMock);
    });

    it('should have onSubmit function', () => {
        expect(component.onSubmit).toBeTruthy();
    });

    it('should call the onSubmit function and return with invalid form', () => {
        const btnContinue = fixture.debugElement.query(By.css('.c-footer__button--next'));
        const btnContinueElement = btnContinue.nativeElement as HTMLButtonElement;

        btnContinueElement.click();
        expect(component.cellForm.status).toBe('INVALID');
    });

    it('should have resendSMS function', () => {
        expect(component.resendSMS).toBeTruthy();
    });

    it('should call the resendSMS function on clicked', () => {
        const btnResendSMS = fixture.debugElement.query(By.css('.c-section__body-resend__button'));
        const btnResendSMSElement = btnResendSMS.nativeElement as HTMLButtonElement;

        btnResendSMSElement.click();
    });
});
