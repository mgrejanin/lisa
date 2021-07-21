import { Component, h, Host, Prop } from '@stencil/core';

import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';
import { ResponsiveProp } from './../../../helpers/responsive.helper';
import { setPropStyle } from './../../../helpers/set-prop-style';

export type FontSize = ResponsiveProp<keyof typeof Token.fontSize>;

@Component({
    tag: 'apollo-link',
    styleUrl: 'link.scss',
    shadow: false,
})
export class Link {
    /**
     * Cor de conteúdo
     */
    @Prop()
    color: ResponsiveProp<string> = 'primary';

    /**
     * Se `true`, o link será aberto em uma nova aba
     */
    @Prop()
    isExternal: boolean;

    /**
     * Contém um URL ou fragmento de URL para o qual o hiperlink aponta. * Se esta propriedade for definida, uma tag âncora será renderizada.
     */
    @Prop()
    href: string;

    /**
     * Para aumentar o tamanho da fonte do texto, você pode passar a propriedade `fontSize`.
     */
    @Prop({ reflect: true })
    fontSize: FontSize = 'base';

    /**
     * Cor do link quando em estado hover
     */
    @Prop()
    hoverColor: ResponsiveProp<string> = 'primary';

    render() {
        return (
            <Host>
                <a class={setPropStyle(this)} href={this.href} target={this.isExternal ? '_blank' : '_self'}>
                    <slot />
                </a>
            </Host>
        );
    }
}
