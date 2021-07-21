import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'apollo-card-action-icons',
    styleUrl: 'card-action-icons.scss',
    shadow: false,
})
export class CardActionIcons {
    render() {
        return (
            <Host class="mdc-card__action-icons">
                <slot></slot>
            </Host>
        );
    }
}
