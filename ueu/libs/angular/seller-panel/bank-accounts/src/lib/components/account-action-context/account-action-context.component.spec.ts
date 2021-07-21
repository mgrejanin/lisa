import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';

import { MockComponent } from 'ng-mocks';

import { AccountActionContextComponent } from './account-action-context.component';

describe('AccountActionContextComponent', () => {
    let component: AccountActionContextComponent;
    let fixture: ComponentFixture<AccountActionContextComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccountActionContextComponent, MockComponent(MatIcon)],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountActionContextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return "pessoaFisica" when the user is Pessoa Fisica', () => {
        const isPhysicalPerson = true;
        const isIndividualEntrepreuner = false;
        const result = component.getTemplate(isPhysicalPerson, isIndividualEntrepreuner);

        expect(result).toBe('physicalPerson');
    });

    it('should return "individual" when the user is not Pessoa Fisica but PJ and Individual', () => {
        const isPhysicalPerson = false;
        const isIndividualEntrepreuner = true;

        const result = component.getTemplate(isPhysicalPerson, isIndividualEntrepreuner);

        expect(result).toBe('individual');
    });

    it('should return "legalPerson" when the user is not Pessoa Fisica but PJ and is not Individual', () => {
        const isPhysicalPerson = false;
        const isIndividualEntrepreuner = false;

        const result = component.getTemplate(isPhysicalPerson, isIndividualEntrepreuner);

        expect(result).toBe('legalPerson');
    });
});
