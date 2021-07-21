import { Component, h } from '@stencil/core';

@Component({
    tag: 'apollo-list-divider',
    styleUrl: 'list-divider.scss',
    shadow: false,
})
export class ApolloListDivider {
    render() {
        return <li class="mdc-list-divider" role="separator"></li>;
    }
}
