import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Define a custom error message for inheritance validation
 * @param validator inherit validator to execute
 * @param message custom error message
 */
export function customMessage(validator: ValidatorFn, message: string): ValidationErrors {
    return (formControl: FormControl) => {
        const validationError = validator(formControl);
        if (validationError !== null) {
            const validatorObject: Record<string, ValidationErrors & { message: string }> = {};
            Object.keys(validationError).forEach(key => {
                validatorObject.customMessage = { ...validationError[key], message };
            });
            return validatorObject;
        }
        return null;
    };
}
