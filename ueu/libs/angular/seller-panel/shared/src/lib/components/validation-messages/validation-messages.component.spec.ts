import { DecimalPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { ValidationMessagesComponent } from './validation-messages.component';

describe('ValidationMessagesComponent', () => {
    let component: ValidationMessagesComponent;
    let fixture: ComponentFixture<ValidationMessagesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ValidationMessagesComponent],
            providers: [DecimalPipe],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ValidationMessagesComponent);
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
        component.control = new FormControl('test', [Validators.minLength(8)]);
        component.control.markAsTouched();

        expect(component.getErrorMessage()).toEqual('O tamanho mínimo deve ser 8 caracteres!');
    });
});
