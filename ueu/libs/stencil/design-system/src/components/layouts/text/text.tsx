import { Component, h, Host, Prop } from '@stencil/core';

import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';

import { ResponsiveProp } from './../../../helpers/responsive.helper';
import { setPropStyle } from './../../../helpers/set-prop-style';

export type FontSize = ResponsiveProp<keyof typeof Token.fontSize>;
export type TextAlign = ResponsiveProp<'left' | 'center' | 'right'>;
export type FontWeight = ResponsiveProp<keyof typeof Token.fontWeight>;

@Component({
    tag: 'apollo-text',
    styleUrl: 'text.scss',
    shadow: false,
})
export class Text {
    /**
     * Cor de conteúdo
     */
    @Prop()
    color: ResponsiveProp<string> = 'grayscale.base';

    /**
     * Para aumentar o tamanho da fonte do texto, você pode passar a propriedade `fontSize`.
     */
    @Prop({ reflect: true })
    fontSize: FontSize = 'base';

    /**
     * Passe `isTruncated` para renderizar reticência quando o texto exceder a largura.
     */
    @Prop()
    isTruncated: boolean;

    /**
     * Da mesma forma, que o `isTruncated` passe a propriedade `noOfLines` e defina-o com o número de linhas desejado.
     */
    @Prop()
    noOfLines: number;

    /**
     * Abreviação de prop no estilo `textAlign`
     */
    @Prop()
    textAlign: ResponsiveProp<TextAlign>;

    /**
     * Abreviação de propriedade de estilo `fontWeight`
     */
    @Prop({ reflect: true })
    fontWeight: FontWeight;

    render() {
        return (
            <Host class={setPropStyle(this)}>
                <slot />
            </Host>
        );
    }
}
