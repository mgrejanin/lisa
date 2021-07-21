import { Component, h, Prop } from '@stencil/core';
import className from 'classnames';

@Component({
    tag: 'lab-title',
    styleUrl: 'title.scss',
    shadow: true,
})
export class LabTitle {
    /**
     * Texto a ser exibido
     * */
    @Prop() text: string = 'Insira seu texto';

    /**
     * Variação do componente a ser exbida
     *  */
    @Prop() type: 'title' | 'subtitle' = 'title';

    /**
     * Indica se o componente está em edição
     */
    @Prop({
        reflect: false,
    })
    isEditing: boolean = false;

    render() {
        return (
            <p
                class={className('lab-title', {
                    'lab-title--default': this.type === 'title',
                    'lab-title--subtitle': this.type === 'subtitle',
                    'lab-title--editing': this.isEditing,
                })}
            >
                {this.text}
            </p>
        );
    }
}
