import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { FieldValidationComponent } from './field-validation.component';

describe('FieldValidationComponent', () => {
    let component: FieldValidationComponent;
    let fixture: ComponentFixture<FieldValidationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FieldValidationComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FieldValidationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should errorMessage function returns null when does not exists formControl input', () => {
        expect(component.getErrorMessage()).toBe(null);
    });

    it('should have getErrorMessage function', () => {
        component.control = new FormControl('test', [Validators.required]);
        component.control.markAsTouched();
        component.control.setErrors({ required: true });

        expect(component.getErrorMessage()).toEqual('Este campo é requerido!');
    });
});
