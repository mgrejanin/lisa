import { Component, Host, h, Prop } from '@stencil/core';

@Component({
    tag: 'lab-markdown',
    styleUrl: 'markdown.scss',
    shadow: true,
})
export class LabMarkdown {
    /**
     * Texto do corpo, podendo conter ou não marcação html
     */
    @Prop() text =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur imperdiet suscipit ex a lacinia.';

    render() {
        return (
            <Host>
                <p class="markdown" innerHTML={this.text}></p>
            </Host>
        );
    }
}
