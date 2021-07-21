import { Component, h, Host, Prop } from '@stencil/core';

import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';

import { ResponsiveProp } from './../../../helpers/responsive.helper';
import { setPropStyle } from './../../../helpers/set-prop-style';

export type Spacing = ResponsiveProp<keyof typeof Token.spacing>;
export type Align = ResponsiveProp<'flex-start' | 'center' | 'flex-end' | 'stretch'>;
export type Direction = ResponsiveProp<'column' | 'row'>;
export type Justify = ResponsiveProp<
    'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
>;

@Component({
    tag: 'apollo-stack',
    styleUrl: 'stack.scss',
    shadow: false,
})
export class Stack {
    /**
     * Passe a propriedade `spacing` para aplicar espaçamento consistente entre cada filho
     */
    @Prop()
    spacing: Spacing;

    /**
     * Abreviação de propriedade de estilo `align-items`
     */
    @Prop()
    alignItems: Align;

    /**
     * Abreviação de propriedade de estilo `justify-content`
     */
    @Prop()
    justify: Justify;

    /**
     * Abreviação de propriedade de estilo `flex-direction`
     */
    @Prop()
    direction: Direction;

    render() {
        return (
            <Host class={setPropStyle(this)}>
                <slot />
            </Host>
        );
    }
}
