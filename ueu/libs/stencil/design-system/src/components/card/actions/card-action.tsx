import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'apollo-card-actions',
    styleUrl: 'card-actions.scss',
    shadow: false,
})
export class CardActions {
    render() {
        return (
            <Host class="mdc-card__actions">
                <slot></slot>
            </Host>
        );
    }
}
