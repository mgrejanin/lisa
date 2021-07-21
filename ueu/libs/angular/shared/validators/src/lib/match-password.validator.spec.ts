import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { passwordMatchValidator } from './match-password.validator';

describe('passwordMatchValidator validator', () => {
    let formBuilder: FormBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
        });
        formBuilder = TestBed.inject(FormBuilder);
    });

    it('should return valid', () => {
        const form = formBuilder.group(
            {
                user_password: ['PicPay@123456', []],
                user_password_confirmation: ['PicPay@123456', []],
            },
            {
                validators: passwordMatchValidator('user_password', 'user_password_confirmation'),
            },
        );

        expect(form.status).toBe('VALID');
    });

    it('should return invalid due to empty input', () => {
        const form = formBuilder.group(
            {
                user_password: ['PicPay@123456', []],
                user_password_confirmation: ['', []],
            },
            {
                validators: passwordMatchValidator('user_password', 'user_password_confirmation'),
            },
        );

        expect(form.errors).toEqual(null);
    });

    it('should return invalid due to mismatch', () => {
        const form = formBuilder.group(
            {
                user_password: ['PicPay@123456', []],
                user_password_confirmation: ['PicPay@654321', []],
            },
            {
                validators: passwordMatchValidator('user_password', 'user_password_confirmation'),
            },
        );

        expect(form.get('user_password_confirmation').errors).toEqual({
            mismatch: true,
        });
    });
});
