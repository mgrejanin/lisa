import { Component, h, Host, Prop } from '@stencil/core';

import { ResponsiveProp } from './../../../helpers/responsive.helper';
import { setPropStyle } from './../../../helpers/set-prop-style';

export type Align = ResponsiveProp<'flex-start' | 'center' | 'flex-end'>;
export type Justify = ResponsiveProp<
    'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
>;
export type Direction = ResponsiveProp<'column' | 'row'>;

@Component({
    tag: 'apollo-flex',
    styleUrl: 'flex.scss',
    shadow: false,
})
export class Flex {
    /**
     * Cria um espaçamento igual entre os elementos. Mantendo o primeiro grudado no início e o último no final.
     */
    @Prop()
    spacer: boolean;

    /**
     * Abreviação de prop no estilo `alignItems`
     */
    @Prop()
    alignItems: Align;

    /**
     * Abreviação de prop de estilo `justifyContent`
     */
    @Prop()
    justify: Justify;

    /**
     * Abreviação de prop no estilo `flexDirection`
     */
    @Prop()
    direction: Direction;

    /**
     * Abreviação de prop no estilo `flexWrap` adiciona o valor `wrap`
     */
    @Prop()
    wrap: boolean;

    /**
     * Pode mudar a ordem usando `reverse`
     */
    @Prop()
    reverse: Direction;

    /**
     * Abreviação de prop no estilo `flexGrow`
     */
    @Prop()
    grow: ResponsiveProp<number>;

    render() {
        return (
            <Host class={setPropStyle(this)}>
                <slot />
            </Host>
        );
    }
}
