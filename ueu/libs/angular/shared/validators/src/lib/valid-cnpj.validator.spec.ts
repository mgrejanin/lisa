import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { isValidCnpj } from './valid-cnpj.validator';

describe('isValidCnpj validator', () => {
    let formBuilder: FormBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
        });
        formBuilder = TestBed.inject(FormBuilder);
    });

    it('should return invalid due to empty input', () => {
        const form = formBuilder.group({
            input: ['', [isValidCnpj()]],
        });

        expect(form.get('input').errors).toEqual(null);
    });

    it('should return invalid due to lack of digits', () => {
        const form = formBuilder.group({
            input: ['00.000.000/0000-0', [isValidCnpj()]],
        });

        expect(form.get('input').errors).toEqual({
            cnpjNotValid: true,
        });
    });

    it('should return invalid due to repeated digits', () => {
        const form = formBuilder.group({
            input: ['00.000.000/0000-00', [isValidCnpj()]],
        });

        expect(form.get('input').errors).toEqual({
            cnpjNotValid: true,
        });
    });

    it('should return invalid due to invalid digits', () => {
        const form = formBuilder.group({
            input: ['22.896.431/0001-23', [isValidCnpj()]],
        });

        expect(form.get('input').errors).toEqual({
            cnpjNotValid: true,
        });
    });
});
