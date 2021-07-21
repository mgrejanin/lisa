import { Component, EventEmitter, h, Host, Event, Prop } from '@stencil/core';

@Component({
    tag: 'apollo-sidebar',
    styleUrl: 'sidebar.scss',
    shadow: false,
})
export class Sidebar {
    /**
     * Quando definido como verdadeiro, o `collapse` irá alternar para fechado
     */
    @Prop({ mutable: true })
    collapsed: boolean = false;

    /**
     * Evento disparado quando o componente é alternado abert/fechado
     */
    @Event() apolloCollapsed: EventEmitter;
    onClick = ev => {
        this.collapsed = !this.collapsed;

        this.apolloCollapsed.emit(ev);
    };

    showMenu = () => {
        this.collapsed = false;
    };

    render() {
        return (
            <Host class={{ collapsed: this.collapsed }}>
                <nav class="apollo-sidebar__nav" role="navigation" aria-labelledby=":ko">
                    <apollo-box class="apollo-sidebar__container" height="100%">
                        <apollo-flex spacer direction="column">
                            <div class="apollo-sidebar__menu">
                                <slot name="menu" />
                            </div>
                            <apollo-ripple class="apollo-sidebar__collapse" on-apolloClick={this.onClick}>
                                <apollo-box
                                    paddingLeft="3"
                                    paddingRight="3"
                                    borderTop="light"
                                    borderColor="grayscale.100"
                                    height="65px"
                                    display="flex"
                                    alignItems="center"
                                >
                                    <apollo-stack spacing="2">
                                        <apollo-icon svg-icon="arrows-arrow-circle-left" />
                                        <apollo-text class="apollo-sidebar__collapse-text" isTruncated>
                                            {this.collapsed ? 'Expandir Menu' : 'Reduzir Menu'}
                                        </apollo-text>
                                    </apollo-stack>
                                </apollo-box>
                            </apollo-ripple>
                        </apollo-flex>
                    </apollo-box>
                </nav>
            </Host>
        );
    }
}
