import { Component, h, Host, Prop } from '@stencil/core';

import { ResponsiveProp } from './../../../../helpers/responsive.helper';
import { setPropStyle } from './../../../../helpers/set-prop-style';

@Component({
    tag: 'apollo-grid-item',
    styleUrl: 'grid-item.scss',
    shadow: false,
})
export class GridItem {
    /**
     * rowSpan
     */
    @Prop()
    rowSpan: number;

    /**
     * colSpan
     */
    @Prop()
    colSpan: number;

    /**
     * colStart
     */
    @Prop()
    colStart: number;

    /**
     * colEnd
     */
    @Prop()
    colEnd: number;

    /**
     * rowStart
     */
    @Prop()
    rowStart: number;

    /**
     * rowEnd
     */
    @Prop()
    rowEnd: number;

    /**
     * Cor de fundo
     */
    @Prop()
    backgroundColor: ResponsiveProp<string>;

    /**
     * Cor de fundo
     */
    @Prop()
    bg: ResponsiveProp<string>;

    render() {
        return (
            <Host class={setPropStyle(this)}>
                <slot />
            </Host>
        );
    }
}
