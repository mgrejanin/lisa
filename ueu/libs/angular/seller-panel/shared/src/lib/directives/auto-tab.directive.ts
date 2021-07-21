import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[sellerPanelAutoTab]',
})
export class AutoTabDirective {
    @Input('sellerPanelAutoTab') nextInput: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

    @HostListener('input', ['$event.target'])
    onInput(input): void {
        const length = input.value.length;
        const maxLength = input.getAttribute('maxlength') || 255;

        if (!this.nextInput) {
            throw Error('Next target to tab undefined!');
        }

        if (input.attributes.disabled || length > maxLength - 1) {
            this.nextInput.focus();
        }
    }
}
