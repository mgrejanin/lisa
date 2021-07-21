import { MDCTextFieldIcon } from '@material/textfield/icon';
import { Component, h, Event, EventEmitter, Host, Prop, Watch } from '@stencil/core';
import classnames from 'classnames';

@Component({
    tag: 'apollo-textfield-icon',
    styleUrl: 'textfield-icon.scss',
    shadow: false,
})
export class TextFieldIcon {
    /**
     * type
     */
    @Prop() type: 'leading' | 'trailing' = 'leading';

    /**
     * disabled
     */
    @Prop() disabled = false;

    /**
     * aria-label
     */
    @Prop() ariaLabel = '';
    private iconEl: HTMLElement;
    private icon: MDCTextFieldIcon;
    @Watch('disabled')
    setDisabled(isDisabled: boolean) {
        this.icon.getDefaultFoundation().setDisabled(isDisabled);
    }
    @Watch('ariaLabel')
    setAriaLabel(aria: string) {
        this.icon.getDefaultFoundation().setAriaLabel(aria);
    }

    componentDidLoad() {
        this.icon = new MDCTextFieldIcon(this.iconEl);
    }

    /**
     * Evento de keyUp
     */
    @Event() apolloKeyUp: EventEmitter<KeyboardEvent>;
    private onKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
            this.apolloKeyUp.emit(ev);
        }
    };

    render() {
        return (
            <Host
                class={classnames('mdc-text-field__icon', {
                    'mdc-text-field__icon--leading': this.type === 'leading',
                    'mdc-text-field__icon--trailing': this.type === 'trailing',
                })}
                tabindex="0"
                role="button"
                ref={(el: HTMLElement) => (this.iconEl = el)}
                onKeyUp={this.onKeyUp}
            >
                <slot></slot>
            </Host>
        );
    }
}
