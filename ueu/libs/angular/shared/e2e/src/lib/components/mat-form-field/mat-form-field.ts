import { findBy } from '../../commands';
import { CustomElement } from '../../custom-element';

export class MatFormFieldElement extends CustomElement {
    @findBy('.mat-error')
    protected matError: CustomElement;
    @findBy('.mat-label')
    protected matLabel: CustomElement;

    checkMatError(expectedValue: string) {
        this.matError.checkValue(expectedValue);
    }

    checkMatLabel(expectedValue: string) {
        this.matLabel.checkValue(expectedValue);
    }

    constructor(selector: string) {
        super(selector);
    }
}
