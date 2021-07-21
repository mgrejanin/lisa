import { Directive, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { CpfCnpjPipe } from '@picpay/angular/shared/pipes';

@Directive({
    selector: '[sellerPanelCpfCnpjFormatter]',
})
export class CpfCnpjFormatterDirective {

    constructor(private cpfCnpjPipe: CpfCnpjPipe, @Optional() @Self() private ngControl: NgControl) {}

    @HostListener('blur', ['$event.target.value'])
    onBlur(value: string): void {
        this.maskResolver(value);
    }

    @HostListener('keyup', ['$event.target.value'])
    onKeyUp(value: string): void {
        this.maskResolver(value);
    }

    @HostListener('paste', ['$event'])
    onPaste(event: Event): void {
        event.preventDefault();
        const evt: ClipboardEvent = <ClipboardEvent>event;
        const pastedText = evt.clipboardData.getData('text/plain');
        this.maskResolver(pastedText);
    }

    private maskResolver(value): void {
        if (!this.ngControl.control) {
            return;
        }

        const formattedVal = this.cpfCnpjPipe.transform(value);
        this.ngControl.control.setValue(formattedVal);
    }
}
