import { Component, h, Host, Prop, Event, EventEmitter, Method, Listen } from '@stencil/core';
import classNames from 'classnames';

@Component({
    tag: 'apollo-toggle-button',
    styleUrl: 'toggle-button.scss',
    shadow: false,
})
export class ToggleButton {
    /**
     * Evento disparado quando o toggle é clickado
     */
    @Event() toggleChange: EventEmitter<MouseEvent>;

    @Listen('click')
    handleClick(event: MouseEvent) {
        this.toggleChange.emit(event);
        this.setChecked(!this.checked);
    }

    /**
     * Estado do botão
     */
    @Prop({ reflect: true, mutable: true }) checked: boolean = false;

    /**
     * Label do botão com estado de toggle off
     */
    @Prop() toggleOffLabel: string;

    /**
     * Label do botão com estado de toggle on
     */
    @Prop() toggleOnLabel: string;

    /**
     * Ícone do botão com estado de toggle Off
     */
    @Prop() toggleOffIcon: string;

    /**
     * Ícone do botão com estado de toggle on
     */
    @Prop() toggleOnIcon: string;

    /**
     * Ícone do botão com estado de toggle Off
     */
    @Prop() toggleOffTypeIcon: string;

    /**
     * Ícone do botão com estado de toggle on
     */
    @Prop() toggleOnTypeIcon: string;

    /**
     * Tamanho do botão
     */
    @Prop()
    size: 'sm' | 'md' = 'sm';

    /**
     * API para alterar o toggle
     */
    @Method()
    async setChecked(checked: boolean) {
        this.checked = checked;
    }

    render() {
        return (
            <Host>
                <apollo-button
                    class={classNames({
                        'apollo-toggle-button__block': !this.checked,
                        'apollo-toggle-button__none': this.checked,
                        'apollo-toggle-button__icon': this.toggleOffIcon?.length > 0 || this.toggleOnIcon?.length > 0,
                    })}
                    variant="outlined"
                    size={this.size}
                >
                    {this.toggleOffIcon?.length > 0 ? (
                        <apollo-icon
                            slot="leading-icon"
                            svgIcon={this.toggleOffIcon}
                            label={this.toggleOffLabel}
                            size="md"
                        ></apollo-icon>
                    ) : (
                        this.toggleOffLabel
                    )}
                </apollo-button>

                <apollo-button
                    class={classNames({
                        'apollo-toggle-button__block': this.checked,
                        'apollo-toggle-button__none': !this.checked,
                        'apollo-toggle-button__icon': this.toggleOffIcon?.length > 0 || this.toggleOnIcon?.length > 0,
                    })}
                    variant="unelevated"
                    size={this.size}
                >
                    {this.toggleOnIcon?.length > 0 ? (
                        <apollo-icon
                            slot="leading-icon"
                            svgIcon={this.toggleOnIcon}
                            label={this.toggleOnLabel}
                            size="md"
                        ></apollo-icon>
                    ) : (
                        this.toggleOnLabel
                    )}
                </apollo-button>
            </Host>
        );
    }
}
