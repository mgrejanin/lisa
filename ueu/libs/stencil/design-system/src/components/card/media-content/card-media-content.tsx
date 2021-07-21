import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'apollo-card-media-content',
    styleUrl: 'card-media-content.scss',
    shadow: false,
})
export class CardMediaContent {
    render() {
        return (
            <Host class="mdc-card__media-content">
                <slot></slot>
            </Host>
        );
    }
}
