import { Component, h, Host, Listen, Prop, Method } from '@stencil/core';

import { MDCRipple } from '@material/ripple';
import classNames from 'classnames';

@Component({
    tag: 'apollo-button',
    styleUrl: 'button.scss',
    shadow: false,
})
export class Button {
    private element: HTMLButtonElement;
    private ripple$: MDCRipple;

    /**
     * API para alterar o loading do button
     */
    @Method()
    async setLoading(loading: boolean) {
        this.loading = loading;
    }

    /**
     * Botão em bloco
     */
    @Prop()
    block = false;

    /**
     * Botão no formato danger
     */
    @Prop({
        reflect: true,
    })
    danger = false;

    /**
     * Desabilita o botão
     */
    @Prop()
    disabled = false;

    /**
     * Página de destino quando clicado
     */
    @Prop()
    href: string;

    /**
     * Habilita o loading no botão
     */
    @Prop({ mutable: true })
    loading: boolean;

    /**
     * Define se a URL passada no href vai ser aberta na mesma aba ou não
     */
    @Prop()
    target: '_blank' | '_self' = '_blank';

    /**
     * Referência do type nativo
     */
    @Prop()
    type: 'button' | 'submit' | 'menu' | 'reset' = 'button';

    /**
     * Referência do name nativo
     */
    @Prop()
    name: string;

    /**
     * Referência do value nativo
     */
    @Prop()
    value: string;

    /**
     * Feedback tátil
     */
    @Prop()
    ripple = true;

    /**
     * Botão redondo
     */
    @Prop()
    round = true;

    /**
     * Tamanho do botão
     */
    @Prop()
    size: 'sm' | 'md' = 'sm';

    /**
     * O estilo do botão
     */
    @Prop()
    variant: 'link' | 'raised' | 'outlined' | 'unelevated' = 'unelevated';

    componentDidRender() {
        if (!(this.ripple$ instanceof MDCRipple) || this.ripple) {
            this.ripple$ = new MDCRipple(this.element);
        } else {
            this.ripple$.destroy();
            delete this.ripple$;
        }
    }

    @Listen('click', { capture: true })
    handleClick(event: MouseEvent) {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (this.href?.length > 0) {
            event.preventDefault();
            window.open(this.href, this.target);
            return;
        }
    }

    @Listen('keyup', { capture: true })
    handleKeyup(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.element.click();
        }
    }

    render() {
        return (
            <Host size={this.size} round={this.round} block={this.block}>
                <div class="mdc-touch-target-wrapper">
                    <button
                        class={classNames('mdc-button mdc-button--touch', {
                            'mdc-button--raised': this.variant === 'raised',
                            'mdc-button--unelevated': this.variant === 'unelevated' || this.variant.length === 0,
                            'mdc-button--outlined': this.variant === 'outlined',
                            'mdc-button--link': this.variant === 'link',
                            'mdc-button--danger': this.danger,
                        })}
                        ref={(el: HTMLButtonElement) => (this.element = el)}
                        disabled={this.disabled || this.loading}
                        type={this.type}
                        name={this.name}
                        value={this.value}
                    >
                        {this.ripple && <div class="mdc-button__ripple"></div>}

                        <div
                            class={classNames('apollo-button-container', {
                                'apollo-button-container__loading': this.loading,
                            })}
                        >
                            {this.danger && <apollo-icon size="sm" svgIcon="location-exclamation-circle"></apollo-icon>}

                            <slot name="leading-icon"></slot>

                            <span class="apollo-button__label">
                                <slot></slot>
                            </span>

                            <slot name="trailing-icon"></slot>
                        </div>

                        {this.loading && <apollo-circular-progress></apollo-circular-progress>}

                        <div class="mdc-button__touch"></div>
                    </button>
                </div>
            </Host>
        );
    }
}
