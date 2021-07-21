import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
    tag: 'apollo-card',
    styleUrl: 'card.scss',
    shadow: false,
})
export class Card {
    /**
     * O estilo do card
     */
    @Prop()
    variant: 'outlined' | 'unelevated' = 'unelevated';

    /**
     * Propriedade para controlar border-radius do componente.
     */
    @Prop()
    radius: 'light' | 'medium' | 'strong' = 'light';

    render() {
        return (
            <Host>
                <div
                    class={classNames('mdc-card', {
                        'mdc-card--outlined': this.variant === 'outlined',
                        'mdc-card--radius-light': this.radius === 'light',
                        'mdc-card--radius-medium': this.radius === 'medium',
                        'mdc-card--radius-strong': this.radius === 'strong',
                    })}
                >
                    <slot></slot>
                </div>
            </Host>
        );
    }
}
