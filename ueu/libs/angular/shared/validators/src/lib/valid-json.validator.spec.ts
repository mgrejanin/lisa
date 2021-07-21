import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { validJson } from './valid-json.validator';

describe('validJson', () => {
    let validator: ValidatorFn;
    let formBuilder: FormBuilder;

    const errorName = 'invalidJson';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
        });

        formBuilder = TestBed.inject(FormBuilder);
        validator = validJson();
    });

    const validCases = [
        '{}',
        '{"key": []}',
        '{"key": true}',
        '{"key": "value"}',
        '{"key1": "value1", "key2": true}',
        '{"key1": "value1", "key2": "value2"}',
        '{"key": ["value1", "value2", "value3"]}',
        '{"key": {"key": {"key": "value"}, "key2": {"key": "value"}}}',
        '{"key1": {"key": "value" }, "key2": {"key1": "value1", "key2": {"key": "value" }}}',
    ];

    validCases.forEach((json, index) => {
        it(`should be valid for index ${index}`, () => {
            const form = formBuilder.group({
                input: [json, [validator]],
            });

            expect(form.get('input').errors).toEqual(null);
        });
    });

    const invalidCases = [
        'not a valid json',
        '{"thisJson": isMissingQuotes }',
        '{"thisJson": "haveAnExtraComma",}',
        '{"thisJson": "have" "aMissing": "comma"}',
        '{"thisJson": {"have": {"aMissing": "bracket"}}',
        '{"thisJson": ["also", "have", "anExtraComma"],}',
        '{"thisJson": {"is": "also" }, "missing": {"a": "comma" ",": {"<<": "there" }}}',
        '{"thisJson": {"have": "an" }, "extra": {"bracket": "at", "the": {"end": ">>" }}}}',
    ];

    invalidCases.forEach((json, index) => {
        it(`should be invalid for index ${index}`, () => {
            const error: ValidationErrors = { [errorName]: true };

            const form = formBuilder.group({
                input: [json, [validator]],
            });

            expect(form.get('input').errors).toEqual(error);
        });
    });
});
