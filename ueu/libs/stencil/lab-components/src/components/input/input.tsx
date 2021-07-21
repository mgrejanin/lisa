import { Component, Host, h, Prop } from '@stencil/core';
import classnames from 'classnames';
@Component({
    tag: 'lab-input',
    styleUrl: 'input.scss',
    shadow: true,
})
export class LabInput {
    private types = {
        general: 'text',
        number: 'number',
        email: 'email',
        password: 'password',
    };
    /**
     * Propriedade de edição do componente
     */
    @Prop({
        reflect: false,
    })
    isEditing: boolean = false;
    /**
     * Indica o tipo de Input
     */
    @Prop() inputType: 'general' | 'number' | 'email' | 'password';
    /**
     * Tamanho máximo do Input
     */
    @Prop() maxSize?: string;
    /**
     * Indica se o Input estará habilitado
     */
    @Prop() isEnabled = true;
    /**
     * Label do Input
     */
    @Prop() label: string;
    /**
     * Valor default
     */
    @Prop() text: string;

    render() {
        const type = this.types[this.inputType] || '';
        return (
            <Host>
                <div
                    class={classnames('lab-input', {
                        'lab-input--editing': this.isEditing,
                    })}
                >
                    <apollo-textfield
                        disabled={!this.isEnabled || this.isEditing}
                        label={this.label}
                        value={this.text}
                        type={type}
                        maxLength={this.maxSize}
                    ></apollo-textfield>
                </div>
            </Host>
        );
    }
}
