import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
    tag: 'apollo-select-item',
    styleUrl: 'select-item.scss',
    shadow: false,
})
export class ApolloSelectItem {
    @Element() host: HTMLApolloSelectItemElement;

    /** Desabilita o item */
    @Prop() disabled = false;

    /** Adiciona estilo de seleção ao item */
    @Prop() selected = false;

    /** Adiciona um valor ao item */
    @Prop() value: any;

    /** Evento chamado ao clicar no item */
    @Event() press: EventEmitter;

    render() {
        return (
            <apollo-list-item disabled={this.disabled} select selected={this.selected} value={this.value} role="option">
                <slot name="leading" />
                <slot />
                <slot name="trailing" />
            </apollo-list-item>
        );
    }
}
