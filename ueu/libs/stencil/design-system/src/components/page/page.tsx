import { Component, h, Host } from '@stencil/core';

@Component({
    tag: 'apollo-page',
    styleUrl: 'page.scss',
    shadow: false,
})
export class ApolloPage {
    render() {
        return <Host></Host>;
    }
}
