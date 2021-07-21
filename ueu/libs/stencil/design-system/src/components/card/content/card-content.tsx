import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'apollo-card-content',
    styleUrl: 'card-content.scss',
    shadow: false,
})
export class CardContent {
    render() {
        return (
            <Host class="mdc-card__content">
                <slot></slot>
            </Host>
        );
    }
}
