import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
    tag: 'apollo-badge',
    styleUrl: 'badge.scss',
    shadow: false,
})
export class ApolloBadge {
    /**
     * Type of badge
     */
    @Prop() variant: 'numeric' | 'simple' = 'simple';

    /**
     * Number
     */
     @Prop() quantity: string | number = '99+';

    render() {
        return (
            <Host>
                <div
                    class={classNames('apollo-badge', {
                        'apollo-badge--numeric': this.variant === 'numeric',
                        'apollo-badge--simple': this.variant === 'simple',
                    })}
                >
                    {this.variant === 'numeric' && this.quantity}
                </div>
            </Host>
        );
    }
}
