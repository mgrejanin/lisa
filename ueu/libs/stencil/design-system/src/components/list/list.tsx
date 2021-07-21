import { MDCList } from '@material/list';
import { Component, Element, h, Host, Prop } from '@stencil/core';
import classnames from 'classnames';

import { hasParentDOMNode } from './../../helpers/dom.helper';

@Component({
    tag: 'apollo-list',
    styleUrl: 'list.scss',
    shadow: false,
})
export class ApolloList {
    @Element() host: HTMLApolloListElement;

    /** Adiciona um estilo para a lista parecer mais compacta  */
    @Prop() dense: boolean;

    private list: MDCList;
    private hasMultipleLine: boolean;
    private isMenuChild: boolean;

    constructor() {
        this.hasMultipleLine = this.host.querySelectorAll(`[slot="line"]`).length > 0;
        this.isMenuChild = hasParentDOMNode(this.host, 'APOLLO-MENU');
    }

    componentDidLoad() {
        if (this.isMenuChild) {
            return;
        }
        this.list = new MDCList(this.host.querySelector('.mdc-list'));
    }

    disconnectedCallback() {
        this.list?.destroy();
    }

    render() {
        const listClassnames = classnames('mdc-list', {
            'mdc-list--two-line': this.hasMultipleLine,
            'mdc-list--dense': this.dense,
        });

        return (
            <Host>
                <ul class={listClassnames} role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                    <slot />
                </ul>
            </Host>
        );
    }
}
