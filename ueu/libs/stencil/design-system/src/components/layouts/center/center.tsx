import { Component, h, Host, Prop } from '@stencil/core';
import { ResponsiveProp } from './../../../helpers/responsive.helper';
import { setPropStyle } from './../../../helpers/set-prop-style';

@Component({
    tag: 'apollo-center',
    styleUrl: 'center.scss',
    shadow: false,
})
export class Center {
    /**
     * Abreviação de propriedade de estilo `backgroundColor`
     */
    @Prop()
    backgroundColor: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `backgroundColor`
     */
    @Prop()
    bg: ResponsiveProp<string>;

    /**
     * Largura do box
     */
    @Prop()
    width: ResponsiveProp<string>;

    /**
     * Altura do box
     */
    @Prop()
    height: ResponsiveProp<string>;

    render() {
        return (
            <Host class={setPropStyle(this)}>
                <slot />
            </Host>
        );
    }
}
