import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { isValidCpf } from './valid-cpf.validator';

describe('isValidCpf validator', () => {
    let fb: FormBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
        });
        fb = TestBed.inject(FormBuilder);
    });

    it('should be invalid formControl when has equal digits a lot', () => {
        const form = fb.group({
            input: ['000.000.000-00', [isValidCpf()]],
        });
        expect(form.get('input').errors).toEqual({
            cpfNotValid: true,
        });
    });

    it('should dont validate formControl when is empty', () => {
        const form = fb.group({
            input: ['', [isValidCpf()]],
        });
        expect(form.get('input').errors).toEqual(null);
    });

    it('should dont validate formControl when has length under 11', () => {
        const form = fb.group({
            input: ['000.000.000-0', [isValidCpf()]],
        });
        expect(form.get('input').errors).toEqual(null);
    });

    it('should be invalid formControl when value was typed incorret', () => {
        const form = fb.group({
            input: ['120.844.704-13', [isValidCpf()]],
        });
        expect(form.get('input').errors).toEqual({
            cpfNotValid: true,
        });
    });

    it('should be invalid formControl when value was typed with alphabetic', () => {
        const form = fb.group({
            input: ['1f0.844.704-13', [isValidCpf()]],
        });
        expect(form.get('input').errors).toEqual({
            cpfNotValid: true,
        });
    });

    it('should be valid formControl', () => {
        const form = fb.group({
            input: ['120.844.704-12', [isValidCpf()]],
        });
        expect(form.get('input').errors).toEqual(null);
    });
});
