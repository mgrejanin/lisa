import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'apollo-list-group',
    styleUrl: 'list-group.scss',
    shadow: false,
})
export class ApolloListGroup {
    /** Adiciona um título para o grupo */
    @Prop() header: string;

    render() {
        return (
            <div class="mdc-list-group">
                {this.header?.length > 0 ? <h3 class="mdc-list-group__subheader">{this.header}</h3> : null}

                <ul class="mdc-list">
                    <slot />
                </ul>
            </div>
        );
    }
}
