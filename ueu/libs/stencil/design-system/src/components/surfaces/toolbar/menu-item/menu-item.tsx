import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'apollo-menu-item',
    styleUrl: 'menu-item.scss',
})
export class MenuItem {
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

    render() {
        return (
            <Host>
                <apollo-box class="apollo-menu-item-container" borderRadius="strong">
                    <apollo-ripple>
                        <a href={this.href} target={this.isExternal ? '_blank' : '_self'}>
                            <slot />
                        </a>
                    </apollo-ripple>
                </apollo-box>
            </Host>
        );
    }
}
