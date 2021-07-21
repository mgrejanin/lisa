import { Component, Element, Host, h, Prop } from '@stencil/core';
import classnames from 'classnames';

import { MDCTextFieldHelperText } from '@material/textfield/helper-text';

@Component({
    tag: 'textfield-helper-text',
    styleUrl: 'textfield-helper-text.scss',
    shadow: false,
})
export class TextfieldHelperText {
    private mdcHelperText: MDCTextFieldHelperText;

    @Element() host: HTMLTextfieldHelperTextElement;
    /**
     * text
     */
    @Prop() text = '';

    /**
     * persist
     */
    @Prop() persist = false;

    /**
     * invalid
     */
    @Prop() invalid = false;

    componentDidLoad() {
        this.mdcHelperText = new MDCTextFieldHelperText(this.host);
        this.mdcHelperText.getDefaultFoundation().setPersistent(this.persist);
    }

    componentDidRender() {
        this.mdcHelperText?.getDefaultFoundation()?.setPersistent(this.persist);
    }

    disconnectedCallback() {
        this.mdcHelperText.destroy();
    }

    render() {
        return (
            <Host
                class={classnames('mdc-text-field-helper-text', {
                    'mdc-text-field-helper-text--persistent': this.persist,
                    'mdc-text-field-helper-text--validation-msg': this.invalid,
                })}
                aria-hidden="true"
            >
                {this.invalid && this.text.length >= 1 && (
                    <apollo-icon svgIcon="feedback-exclamation-circle" size="sm"></apollo-icon>
                )}
                {this.text}
            </Host>
        );
    }
}
