import { Component, h, Prop, Host, Element } from '@stencil/core';

@Component({
    tag: 'apollo-collapse',
    styleUrl: 'collapse.scss',
    shadow: false,
})
export class Collapse {
    /**
     * Quando definido como verdadeiro, o `collapse` irá alternar aberto
     */
    @Prop({ mutable: true })
    collapsed: boolean = false;

    @Element() host: HTMLElement;

    componentWillLoad() {
        if (this.host.children[0].getAttribute('slot') === 'header') {
            this.host.children[0].addEventListener('click', () => {
                this.collapsed = !this.collapsed;
            });
        }
    }

    render() {
        return (
            <Host class={{ collapsed: this.collapsed }}>
                <slot name="header" />
                <div class="apollo-collapse-body">
                    <slot name="body" />
                </div>
            </Host>
        );
    }
}
