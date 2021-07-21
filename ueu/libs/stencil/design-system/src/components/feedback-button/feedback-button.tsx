import { Component, h, Host, Prop, Event, EventEmitter, Method, Listen } from '@stencil/core';
import classNames from 'classnames';

@Component({
    tag: 'apollo-feedback-button',
    styleUrl: 'feedback-button.scss',
    shadow: false,
})
export class FeedbackButton {
    /**
     * Evento disparado quando o toggle é clickado
     */
    @Event() toggleChange: EventEmitter<MouseEvent>;

    @Listen('click')
    handleClick(event: MouseEvent) {
        // Stop events on feedback type button
        if (this.checked) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        this.toggleChange.emit(event);
        this.setChecked(!this.checked);
        this.startFeedbackTimeout(this.delay);
    }

    /**
     * Estado do botão
     */
    @Prop({ reflect: true, mutable: true }) checked: boolean = false;

    /**
     * Aplica um delay para o botão voltar ao estado inicial
     */
    @Prop() delay: number = 1.6;

    /**
     * Label do botão com estado de toggle off
     */
    @Prop() toggleOffLabel: string;

    /**
     * Label do botão com estado de toggle on
     */
    @Prop() toggleOnLabel: string;

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

    /**
     * API para chamar a animação de feedback
     */
    @Method()
    async startFeedbackTimeout(delay: number) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.setChecked(!this.checked));
            }, 1000 * delay);
        });
    }

    render() {
        return (
            <Host>
                <apollo-button
                    class={classNames({
                        'apollo-feedback-button__block': !this.checked,
                        'apollo-feedback-button__none': this.checked,
                    })}
                    variant="outlined"
                    size={this.size}
                >
                    {this.toggleOffLabel}
                </apollo-button>

                <apollo-button
                    class={classNames({
                        'apollo-feedback-button__block': this.checked,
                        'apollo-feedback-button__none': !this.checked,
                    })}
                    variant="unelevated"
                    size={this.size}
                >
                    {this.toggleOnLabel}
                </apollo-button>
            </Host>
        );
    }
}
