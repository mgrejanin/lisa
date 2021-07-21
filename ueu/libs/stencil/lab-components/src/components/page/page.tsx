import { Component, Host, h } from '@stencil/core';
@Component({
    tag: 'lab-page',
    styleUrl: 'page.scss',
    shadow: false,
})
export class LabPage {
    render() {
        return (
            <Host>
                <lab-button label="Botão"></lab-button>
            </Host>
        );
    }
}
