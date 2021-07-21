import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';
import { MockNotificationsService, NotificationsService } from '@picpay/angular/shared/core/notifications';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { ImageButtonComponent } from '../../components/image-button/image-button.component';
import { MockupComponent } from '../../components/mockup/mockup.component';
import { StepService } from '../../data-access';
import { StepServiceMock } from '../../data-access/step/step.service.mock';
import { CompanyLogoNameServiceMock } from '../../mocks/company-logo-name.service.mock';
import { CompanyLogoNameService } from '../../services/company-logo-name/company-logo-name.service';
import { CompanyLogoNameComponent } from './company-logo-name.component';

describe('CompanyLogoNameComponent', () => {
    let component: CompanyLogoNameComponent;
    let fixture: ComponentFixture<CompanyLogoNameComponent>;

    let stepService: StepService;
    let companyLogoNameService: CompanyLogoNameService;

    const mockStep = {
        headerTitle: 'Sua empresa no PicPay',
        valueProgressBar: 2,
    };

    // Valid image file mock
    const validMockImage: File = new File([''], 'test-file.jpg', { lastModified: null, type: 'image/jpeg' });
    Object.defineProperty(validMockImage, 'size', { value: 921600 });
    Object.defineProperty(validMockImage, 'data', { value: 'imageData' });

    // Invalid image file mock
    const invalidMockImage: File = new File([''], 'test-file.jpg', { lastModified: null, type: 'image/jpeg' });
    Object.defineProperty(invalidMockImage, 'size', { value: 2097152 });

    const mockData = {
        company_logo: validMockImage,
        company_display: 'Empresa Teste LTDA',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CompanyLogoNameComponent, ImageButtonComponent, MockupComponent],
            imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, DesignSystemAngularModule],
            providers: [
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                { provide: StepService, useClass: StepServiceMock },
                { provide: CompanyLogoNameService, useClass: CompanyLogoNameServiceMock },
                {
                    provide: NotificationsService,
                    useValue: new MockNotificationsService({ confirmed: true }),
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyLogoNameComponent);
        component = fixture.componentInstance;

        stepService = TestBed.inject(StepService);
        companyLogoNameService = TestBed.inject(CompanyLogoNameService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should create an H1 with the text', () => {
        const title = fixture.debugElement.query(By.css('.c-section__title')).nativeElement as HTMLHeadingElement;
        expect(title.textContent.trim()).toEqual(component.title);
    });

    it('should have disclaimer', () => {
        const disclaimer = fixture.debugElement.query(By.css('.c-section__form-figure-item--disclaimer')).nativeElement;
        expect(disclaimer).toBeTruthy();
    });

    it('should back button', () => {
        const btnBack = fixture.debugElement.query(By.css('.c-footer__button--previous'));
        const btnBackElement = btnBack.nativeElement as HTMLButtonElement;

        // checking text
        expect(btnBackElement.textContent.trim()).toBe('Voltar');

        // checking route
        const routerLink = btnBackElement.getAttribute('ng-reflect-router-link');
        expect(routerLink).toBe('/form/senha');
    });

    it('should have a formFields get accessor', () => {
        expect(component.formFields).toBeDefined();
    });

    it('shoud call the ngOnInit() lifecycle', () => {
        const initStepSpy = spyOn(stepService, 'initStep');

        component.ngOnInit();

        expect(initStepSpy).toHaveBeenCalledWith(mockStep);
    });

    it('should submit form on submit button click', () => {
        const onSubmitSpy = spyOn(component, 'onSubmit');
        const button = fixture.debugElement.query(By.css('.c-footer__button--next')).nativeElement;

        button.click();
        expect(onSubmitSpy).toHaveBeenCalled();
    });

    it('should call the onSubmit() function and return with invalid form', () => {
        const button = fixture.debugElement.query(By.css('.c-footer__button--next')).nativeElement;

        button.click();
        expect(component.companyDataForm.status).toBe('INVALID');
    });

    it('should postCompanyLogoName and submit form', () => {
        const postCompanyLogoNameSpy = spyOn(companyLogoNameService, 'postCompanyLogoName').and.callThrough();
        const routerSpy = spyOn(component['router'], 'navigate').and.returnValue(true);

        component.companyDataForm.patchValue(mockData);
        component.onSubmit();

        expect(postCompanyLogoNameSpy).toHaveBeenCalledWith(component.companyDataForm.value);

        expect(routerSpy).toHaveBeenCalledWith(['/form/empresa-detalhe']);
    });

    it('should call the selectedImageEvent event seller-register-image-button', () => {
        const inputLogo = fixture.debugElement.query(By.css('.c-section__form-figure-item--logo'));
        const onFileSelectSpy = spyOn(component, 'onFileSelect');

        inputLogo.triggerEventHandler('selectedImageEvent', validMockImage);

        expect(onFileSelectSpy).toHaveBeenCalledTimes(1);
        expect(onFileSelectSpy).toHaveBeenCalledWith(validMockImage);
    });

    it('should call the onFileSelectError() function and return with invalid file', () => {
        const inputLogo = fixture.debugElement.query(By.css('.c-section__form-figure-item--logo'));
        const onFileSelectSpy = spyOn(component, 'onFileSelectError');
        const errorMessageMock = 'Erro no upload da imagem';

        inputLogo.triggerEventHandler('errorEvent', errorMessageMock);

        expect(onFileSelectSpy).toHaveBeenCalledTimes(1);
        expect(onFileSelectSpy).toHaveBeenCalledWith(errorMessageMock);
    });

    it('should call onFileSelectError() function', () => {
        expect(component.onFileSelectError).toBeTruthy();
        const errorMessageMock = 'Erro no upload da imagem';

        component.onFileSelectError(errorMessageMock);
    });

    it('should call onFileSelect() function', () => {
        expect(component.onFileSelect).toBeTruthy();

        component.onFileSelect(validMockImage);
    });
});
