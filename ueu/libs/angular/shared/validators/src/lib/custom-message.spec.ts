import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { customMessage } from './custom-message';

const returnError = {
    actualValue: 'mock text',
    requiredPattern: '[a-z]+',
};
const message = 'mensagem customizada';

describe('customMessage validator', () => {
    let fb: FormBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
        });
        fb = TestBed.inject(FormBuilder);
    });

    it('should be invalid formControl with custom message', () => {
        const validatorFn = jest.fn().mockReturnValue({
            pattern: returnError,
        });
        const form = fb.group({
            input: ['', [customMessage(validatorFn, message)]],
        });
        expect(form.get('input').errors).toEqual({
            customMessage: {
                ...returnError,
                message,
            },
        });
    });

    it('should be valid formControl', () => {
        const validatorFn = jest.fn().mockReturnValue(null);
        const form = fb.group({
            input: ['', [customMessage(validatorFn, message)]],
        });
        expect(form.get('input').errors).toEqual(null);
    });
});
