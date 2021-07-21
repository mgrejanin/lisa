import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DesignSystemAngularModule } from '@picpay/design-system-angular';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';
import { CoreDataAccessService } from '@picpay/angular/shared/core/data-access';

import { StepService } from '../../data-access/step/step.service';
import { StepServiceMock } from '../../data-access/step/step.service.mock';

import { SellerService } from '../../data-access/seller/seller.service';

import { CepService } from '@picpay/angular/shared/services';
import { CepServiceMock } from '@picpay/angular/shared/services';

import { PersonalAddressService } from '../../services/personal-address/personal-address.service';
import { PersonalAddressServiceMock } from '../../mocks/personal-address.service.mock';

import { PersonalAddressComponent } from './personal-address.component';

describe('PersonalAdressComponent', () => {
    let component: PersonalAddressComponent;
    let fixture: ComponentFixture<PersonalAddressComponent>;

    let stepService: StepService;
    let sellerService: SellerService;
    let personalAddressService: PersonalAddressService;
    let cepService: CepService;

    const mockStep = {
        headerTitle: 'Endereço da pessoa responsável',
        valueProgressBar: 3,
    };

    const validCep = '05317-020';
    const invalidCep = '99999-999';

    const mockResponse = {
        cep: '05317-020',
        logradouro: 'Avenida Manuel Bandeira',
        complemento: '',
        bairro: 'Vila Leopoldina',
        localidade: 'São Paulo',
        uf: 'SP',
        ibge: '3550308',
        gia: '1004',
        ddd: '11',
        siafi: '7107',
    };

    const mockAddress = {
        user_address_code: '05317-020',
        user_address_street: 'Avenida Manuel Bandeira',
        user_address_complement: 'Bloco B',
        user_address_number: '291',
        user_address_neighbourhood: 'Vila Leopoldina',
        user_address_city: 'São Paulo',
        user_address_state: 'SP',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PersonalAddressComponent],
            imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, DesignSystemAngularModule],
            providers: [
                {
                    provide: CoreDataAccessService,
                    useValue: {
                        getConfig: () => ({ apiUrl: 'test.com' }),
                    },
                },
                { provide: StepService, useClass: StepServiceMock },
                { provide: PersonalAddressService, useClass: PersonalAddressServiceMock },
                { provide: CepService, useClass: CepServiceMock },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonalAddressComponent);
        component = fixture.componentInstance;

        stepService = TestBed.inject(StepService);
        sellerService = TestBed.inject(SellerService);
        personalAddressService = TestBed.inject(PersonalAddressService);
        cepService = TestBed.inject(CepService);

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('shoud call the ngOnInit() lifecycle', () => {
        const initStepSpy = spyOn(stepService, 'initStep');

        component.ngOnInit();

        expect(initStepSpy).toHaveBeenCalledWith(mockStep);
    });

    it('should call the handleCep() function on apolloBlur event', () => {
        const handleCepSpy = spyOn(component, 'handleCep');
        const cepInput = fixture.debugElement.query(By.css('.c-section__form-input--cep')).nativeElement;
        cepInput.dispatchEvent(new Event('apolloBlur'));

        expect(handleCepSpy).toHaveBeenCalled();
    });

    it('should call handleCep() function and return invalid status to CEP input', () => {
        const cepInput = component.formFields.user_address_code;
        cepInput.setValue('000');

        const input = fixture.debugElement.query(By.css('.c-section__form-input--cep')).nativeElement;
        input.dispatchEvent(new Event('apolloBlur'));

        expect(cepInput.status).toBe('INVALID');
    });

    it('should call the setFormData() function and return correct response', () => {
        const cepInput = component.formFields.user_address_code;
        cepInput.setValue(validCep);

        const setFormDataSpy = spyOn(component, 'setFormData');

        const input = fixture.debugElement.query(By.css('.c-section__form-input--cep')).nativeElement;
        input.dispatchEvent(new Event('apolloBlur'));

        expect(setFormDataSpy).toHaveBeenCalledWith(mockResponse);
    });

    it('should call the getLocation() function and return an error', () => {
        const cepServiceSpy = spyOn(cepService, 'getLocation').and.returnValue(throwError({}));

        const cepInput = component.formFields.user_address_code;
        cepInput.setValue(invalidCep);

        component.handleCep(invalidCep);

        expect(cepServiceSpy).toHaveBeenCalledWith(invalidCep);
        expect(cepInput.status).toBe('INVALID');
    });

    it('should call the setFormData() function and patch form values', () => {
        component.setFormData(mockResponse);

        expect(component.formFields.user_address_street.value).toMatch(mockResponse.logradouro);
        expect(component.formFields.user_address_neighbourhood.value).toMatch(mockResponse.bairro);
        expect(component.formFields.user_address_city.value).toMatch(mockResponse.localidade);
        expect(component.formFields.user_address_state.value).toMatch(mockResponse.uf);
    });

    it('should submit form on submit button click', () => {
        const onSubmitSpy = spyOn(component, 'onSubmit');
        const button = fixture.debugElement.query(By.css('.c-footer__button--next')).nativeElement;

        button.dispatchEvent(new Event('click'));
        expect(onSubmitSpy).toHaveBeenCalled();
    });

    it('should updateDataSeller and submit form', () => {
        const postPersonalAddressSpy = spyOn(personalAddressService, 'postPersonalAddress').and.callThrough();
        const updateDataSellerSpy = spyOn(sellerService, 'updateDataSeller');
        const routerSpy = spyOn(component['router'], 'navigate').and.returnValue(true);

        component.personalAdressForm.patchValue(mockAddress);
        component.onSubmit();

        expect(postPersonalAddressSpy).toHaveBeenCalledWith(component.personalAdressForm.value);
        expect(updateDataSellerSpy).toHaveBeenCalled();
        expect(routerSpy).toHaveBeenCalledWith(['/form/validacao-telefone']);
    });

    it('should call the onSubmit() function and return with invalid form', () => {
        const button = fixture.debugElement.query(By.css('.c-footer__button--next')).nativeElement;

        button.dispatchEvent(new Event('click'));
        expect(component.personalAdressForm.status).toBe('INVALID');
    });
});
