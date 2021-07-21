import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'apollo-card-action-buttons',
    styleUrl: 'card-action-buttons.scss',
    shadow: false,
})
export class CardActionButtons {
    render() {
        return (
            <Host class="mdc-card__action-buttons">
                <slot></slot>
            </Host>
        );
    }
}
