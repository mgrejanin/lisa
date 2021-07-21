import { Component, h, Host, Prop } from '@stencil/core';

import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';

import { ResponsiveProp } from './../../../helpers/responsive.helper';
import { setPropStyle } from './../../../helpers/set-prop-style';

export type Size = ResponsiveProp<keyof typeof Token.size>;
export type Spacing = ResponsiveProp<keyof typeof Token.spacing>;

@Component({
    tag: 'apollo-container',
    styleUrl: 'container.scss',
    shadow: false,
})
export class Container {
    paddingLeft: Spacing = '2';
    paddingRight: Spacing = '2';

    /**
     * Determine a largura máxima do container.
     * A largura do container aumenta com o tamanho da tela.
     */
    @Prop()
    maxW: Size;

    /**
     * Se for `true`, o container centralizará seus filhos independentemente de sua largura.
     */
    @Prop()
    centerContent: boolean = false;

    /**
     * A largura de um container fluído é limitada pelo valor da propriedade `maxW`.
     */
    @Prop()
    fluid: boolean = false;

    componentWillRender() {
        if (!this.fluid) {
            this.maxW = { base: 'full', xs: 'xs', sm: 'sm', md: 'md', lg: 'lg' };
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
