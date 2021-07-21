import { Component, Host, h, Prop } from '@stencil/core';
import classnames from 'classnames';

@Component({
    tag: 'lab-button',
    styleUrl: 'button.scss',
    shadow: true,
})
export class LabButton {
    private variant;
    private typesMap = {
        button: 'unelevated',
        button_link: 'link',
    };

    /**
     * Tipo do botão
     */
    @Prop() type: 'button' | 'button_link' = 'button';

    /**
     * Texto do botão
     */
    @Prop() label: string;

    /**
     * Habilita ou desabilita interação para edição
     */
    @Prop({
        reflect: false,
    })
    isEditing: boolean = false;

    componentWillLoad() {
        this.variant = this.typesMap[this.type];
    }

    render() {
        return (
            <Host>
                <div
                    class={classnames('lab-button', {
                        'lab-button--editing': this.isEditing,
                    })}
                >
                    <apollo-button type="button" variant={this.variant}>
                        {this.label}
                    </apollo-button>
                </div>
            </Host>
        );
    }
}
