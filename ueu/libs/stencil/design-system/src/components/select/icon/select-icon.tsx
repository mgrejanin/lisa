import { MDCSelectIcon } from '@material/select/icon';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import classnames from 'classnames';

@Component({
    tag: 'apollo-select-icon',
    styleUrl: 'select-icon.scss',
    shadow: false,
})
export class ApolloSelectIcon {
    /**
     * disabled
     */
    @Prop() disabled = false;

    /**
     * aria-label
     */
    @Prop() ariaLabel = '';
    private iconEl: HTMLElement;
    private icon: MDCSelectIcon;
    @Watch('disabled')
    setDisabled(isDisabled: boolean) {
        this.icon.getDefaultFoundation().setDisabled(isDisabled);
    }
    @Watch('ariaLabel')
    setAriaLabel(aria: string) {
        this.icon.getDefaultFoundation().setAriaLabel(aria);
    }

    componentDidLoad() {
        this.icon = new MDCSelectIcon(this.iconEl);
    }

    render() {
        return (
            <Host
                class={classnames('mdc-select__icon', 'mdc-select__icon--leading')}
                tabindex="0"
                role="button"
                ref={(el: HTMLElement) => (this.iconEl = el)}
            >
                <slot></slot>
            </Host>
        );
    }
}
