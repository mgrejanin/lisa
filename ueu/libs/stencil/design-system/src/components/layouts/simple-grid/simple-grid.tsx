import { Component, h, Prop, Host } from '@stencil/core';

import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';

import { ResponsiveProp } from './../../../helpers/responsive.helper';
import { setPropStyle } from './../../../helpers/set-prop-style';

export type Spacing = ResponsiveProp<keyof typeof Token.spacing>;

@Component({
    tag: 'apollo-simple-grid',
    styleUrl: 'simple-grid.scss',
    shadow: false,
})
export class SimpleGrid {
    /**
     * Passe a propriedade `spacing` para aplicar espaçamento consistente entre cada filho
     */
    @Prop()
    spacing: Spacing;

    /**
     * O número de colunas
     */
    @Prop()
    columns: ResponsiveProp<number>;

    /**
     * A largura na qual os elementos filho serão divididos em colunas. Passe um número para valores de pixel ou uma string para qualquer outro comprimento CSS válido.
     */
    @Prop()
    minChildWidth: ResponsiveProp<string>;

    render() {
        return (
            <Host class={setPropStyle(this)}>
                <slot />
            </Host>
        );
    }
}
