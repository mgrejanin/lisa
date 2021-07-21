import { Directive, ElementRef, HostListener, Injector } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

import { ValueAccessor } from './value-accessor';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'apollo-select',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: SelectValueAccessorDirective,
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: SelectValueAccessorDirective,
            multi: true,
        },
    ],
})
export class SelectValueAccessorDirective extends ValueAccessor {
    helperTextDefault = '';
    helperText = true;
    input: HTMLApolloTextfieldElement;

    constructor(injector: Injector, el: ElementRef) {
        super(injector, el);
        this.input = this.el.nativeElement as HTMLApolloTextfieldElement;
        this.helperTextDefault = this.input.helperText;
    }

    @HostListener('apolloChange', ['$event'])
    handleValueChange(el: CustomEvent<string>) {
        this.handleChangeEvent(el.target as HTMLElement, el.detail);
    }

    /**
     * Validation
     */
    validate(control: AbstractControl): ValidationErrors | null {
        return this.handleValidate(control, this.input);
    }
}
