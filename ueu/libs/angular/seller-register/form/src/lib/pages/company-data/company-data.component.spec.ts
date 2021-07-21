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

import { CompanyDataService } from '../../services/company-data/company-data.service';
import { CompanyDataServiceMock } from '../../mocks/company-data.service.mock';

import { CompanyDataComponent } from './company-data.component';

describe('CompanyDataComponent', () => {
    let component: CompanyDataComponent;
    let fixture: ComponentFixture<CompanyDataComponent>;

    let stepService: StepService;
    let sellerService: SellerService;
    let companyDataService: CompanyDataService;

    const mockStep = {
        headerTitle: 'Sobre a empresa',
        valueProgressBar: 6,
    };

    const mockData = {
        company_cnpj: '22.896.431/0001-10',
        company_social: 'Picpay Serviços S.A',
        company_type: 'Outros',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CompanyDataComponent],
            imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, DesignSystemAngularModule],
            providers: [
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                { provide: StepService, useClass: StepServiceMock },
                { provide: CompanyDataService, useClass: CompanyDataServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CompanyDataComponent);
        component = fixture.componentInstance;

        stepService = TestBed.inject(StepService);
        sellerService = TestBed.inject(SellerService);
        companyDataService = TestBed.inject(CompanyDataService);

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

    it('should submit form on submit button click', () => {
        const onSubmitSpy = spyOn(component, 'onSubmit');
        const button = fixture.debugElement.query(By.css('.c-footer__button--next')).nativeElement;

        button.dispatchEvent(new Event('click'));
        expect(onSubmitSpy).toHaveBeenCalled();
    });

    it('should call the onSubmit() function and return with invalid form', () => {
        const button = fixture.debugElement.query(By.css('.c-footer__button--next')).nativeElement;

        button.dispatchEvent(new Event('click'));
        expect(component.companyDataForm.status).toBe('INVALID');
    });

    it('should updateDataSeller and submit form', () => {
        const postCompanyDataSpy = spyOn(companyDataService, 'postCompanyData').and.callThrough();
        const updateDataSellerSpy = spyOn(sellerService, 'updateDataSeller');
        const routerSpy = spyOn(component['router'], 'navigate').and.returnValue(true);

        component.companyDataForm.patchValue(mockData);
        component.onSubmit();

        expect(postCompanyDataSpy).toHaveBeenCalledWith(component.companyDataForm.value);
        expect(updateDataSellerSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalledWith(['/form/endereco-empresa']);
    });
});
