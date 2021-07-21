import { Component, h, Host, Prop } from '@stencil/core';

import classnames from 'classnames';

@Component({
    tag: 'apollo-card-media',
    styleUrl: 'card-media.scss',
    shadow: false,
})
export class CardMedia {
    /**
     * Escala automaticamente a altura da área de mídia de acordo com sua largura, mantendo uma proporção quadrada ou 16:9.
     */
    @Prop() image: string;

    /**
     * Escala automaticamente a altura da área de mídia de acordo com sua largura, mantendo uma proporção quadrada ou 16:9.
     */
    @Prop() format: 'square' | '16:9' | '1:1' = 'square';

    render() {
        return (
            <Host
                class={classnames(`mdc-card__media`, {
                    'mdc-card__media--square': this.format === 'square' || this.format === '1:1',
                    'mdc-card__media--16-9': this.format === '16:9',
                })}
                style={{
                    'background-image': this.image !== '' ? 'url(' + this.image + ')' : '',
                }}
            >
                {/* <div class="mdc-card__media-content"> */}
                <slot></slot>
                {/* </div> */}
            </Host>
        );
    }
}
