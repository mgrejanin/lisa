import { findBy } from '../../commands';
import { CustomElement } from '../../custom-element';
import { MatFormFieldElement } from './mat-form-field';

export class MatFormFieldInputElement extends MatFormFieldElement {
    @findBy('.mat-input-element')
    protected matInput: CustomElement;

    value(value: string) {
        this.matInput.value(value);
    }
    shouldBeInvalid() {
        this.matInput.shouldHaveClass('ng-invalid');
        this.matError.shouldBeVisible();
    }

    constructor(selector: string) {
        super(selector);
    }
}
