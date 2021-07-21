import { Component, Element, Event, EventEmitter, h, Prop } from '@stencil/core';
import classnames from 'classnames';

@Component({
    tag: 'apollo-list-item',
    styleUrl: 'list-item.scss',
    shadow: false,
})
export class ApolloListItem {
    @Element() host: HTMLApolloListItemElement;

    /** Desabilita o item */
    @Prop() disabled = false;

    /** Adiciona estilo de seleção ao item */
    @Prop() selected = false;

    /** Se é componente de select */
    @Prop() select = false;

    /** Adiciona um valor ao item */
    @Prop() value: any;

    /** Adiciona uma role para o item */
    @Prop() role: 'menuitem' | 'option' = 'menuitem';

    /** Adiciona um texto secundário para o item */
    @Prop() secondaryText: string | null = null;

    /** Evento chamado ao clicar no item */
    @Event() press: EventEmitter;

    private hasLeadingSlot: boolean;
    private hasTrailingIcon: boolean;
    private linesTextNodes: NodeListOf<Element>;
    private hasMultiText: boolean;

    constructor() {
        this.hasLeadingSlot = Boolean(this.host.querySelector(`[slot="leading"]`));
        this.hasTrailingIcon = Boolean(this.host.querySelector(`[slot="trailing"]`));
        this.linesTextNodes = this.host.querySelectorAll(`[slot="line"]`);
        this.hasMultiText = this.linesTextNodes.length > 0;
    }

    private handleOnPress = (event: MouseEvent) => {
        if (this.disabled) {
            return;
        }
        this.press.emit(event);
    };

    componentWillLoad() {
        this.hasLeadingSlot = Boolean(this.host.querySelector(`[slot="leading"]`));
        this.hasTrailingIcon = Boolean(this.host.querySelector(`[slot="trailing"]`));

        const linesTextNodes = this.host.querySelectorAll(`[slot="line"]`);
        if (this.hasMultiText) {
            const orderIndexes = ['mdc-list-item__primary-text', 'mdc-list-item__secondary-text'];
            linesTextNodes.forEach((node, index) => node.classList.add(orderIndexes[index]));
        }
    }

    render() {
        const listClassnames = classnames('mdc-list-item', {
            'mdc-list-item--disabled': this.disabled,
            'mdc-list-item--selected': this.selected,
        });

        return (
            <li
                class={listClassnames}
                role={this.role}
                onClick={this.handleOnPress}
                aria-selected={String(this.selected)}
                data-value={this.select ? this.value : ''}
            >
                <span class="mdc-list-item__ripple"></span>

                {this.hasLeadingSlot ? (
                    <span class="mdc-list-item__graphic" aria-hidden="true">
                        <slot name="leading" />
                    </span>
                ) : null}

                <span class="mdc-list-item__text">{this.hasMultiText ? <slot name="line" /> : <slot />}</span>

                {this.hasTrailingIcon ? (
                    <span aria-hidden="true" class="mdc-list-item__meta material-icons">
                        <slot name="trailing" />
                    </span>
                ) : null}
            </li>
        );
    }
}
