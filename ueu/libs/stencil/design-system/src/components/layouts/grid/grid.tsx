import { Component, Host, h, Prop } from '@stencil/core';

import { setPropStyle } from './../../../helpers/set-prop-style';

@Component({
    tag: 'apollo-grid',
    styleUrl: 'grid.scss',
    shadow: false,
})
export class Grid {
    /**
     * Abreviação de prop no estilo `templateColumns`
     */
    @Prop()
    templateColumns: string;

    /**
     * Abreviação de prop no estilo `gap`
     */
    @Prop()
    gap: number;

    /**
     * Abreviação de prop no estilo `templateRows`
     */
    @Prop()
    templateRows: string;

    /**
     * Abreviação de prop no estilo `height`
     */
    @Prop()
    height: string;

    render() {
        return (
            <Host class={setPropStyle(this)}>
                <slot />
            </Host>
        );
    }
}
