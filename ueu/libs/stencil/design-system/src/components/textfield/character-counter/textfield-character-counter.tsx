import { Component, Element, Host, h } from '@stencil/core';

import { MDCTextFieldCharacterCounter } from '@material/textfield/character-counter';

@Component({
    tag: 'textfield-character-counter',
    styleUrl: 'textfield-character-counter.scss',
    shadow: false,
})
export class TextfieldCharacterCounter {
    private mdcCharacterCounter: MDCTextFieldCharacterCounter;

    @Element() host: HTMLTextfieldCharacterCounterElement;

    componentDidLoad() {
        this.mdcCharacterCounter = new MDCTextFieldCharacterCounter(this.host);
        this.mdcCharacterCounter.getDefaultFoundation().init();
    }

    disconnectedCallback() {
        this.mdcCharacterCounter.destroy();
    }

    render() {
        return <Host class="mdc-text-field-character-counter"></Host>;
    }
}
