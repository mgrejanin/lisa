import { Component, h, Host, Prop } from '@stencil/core';

import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';

import { ResponsiveProp } from './../../../helpers/responsive.helper';
import { setPropStyle } from './../../../helpers/set-prop-style';

export type Size = ResponsiveProp<'sm' | 'md' | 'lg'>;
export type FontSize = ResponsiveProp<keyof typeof Token.fontSize>;

@Component({
    tag: 'apollo-heading',
    styleUrl: 'heading.scss',
})
export class Heading {
    fontSize: FontSize;

    /**
     * Cor de conteúdo
     */
    @Prop()
    color: ResponsiveProp<string> = 'black';

    /**
     * Para aumentar o tamanho da fonte do texto, você pode passar a propriedade `size`.
     */
    @Prop({ reflect: true })
    size: Size;

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

    componentWillRender() {
        switch (this.size) {
            case 'sm':
                this.fontSize = 'xl';
                break;
            case 'lg':
                this.fontSize = '6xl';
                break;
            default:
                this.fontSize = '4xl';
                break;
        }
    }

    render() {
        return (
            <Host class={setPropStyle(this)}>
                <slot />
            </Host>
        );
    }
}
