import { Component, Host, h, Prop } from '@stencil/core';

@Component({
    tag: 'apollo-ghost-element',
    styleUrl: 'ghost-element.scss',
    shadow: true,
})
export class ApolloGhostElement {
    /**
     * Largura do elemento
     */
    @Prop() width: string = '0px';

    /**
     * Altura do elemento
     */
    @Prop() height: string = '0px';

    /**
     * Margem aplicada ao elemento
     */
    @Prop() margin: string = '0px';

    /**
     * Espaçamento aplicado ao elemento
     */
    @Prop() padding: string = '0px';

    /**
     * Espaçamento aplicado ao elemento
     */
    @Prop() display: string = 'inline-block';

    render() {
        return (
            <Host
                style={{
                    width: this.width,
                    height: this.height,
                    margin: this.margin,
                    padding: this.padding,
                    display: this.display,
                }}
            >
                <div class="apollo-ghost-element"></div>
            </Host>
        );
    }
}
