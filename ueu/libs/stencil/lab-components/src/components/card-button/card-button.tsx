import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import classnames from 'classnames';

@Component({
    tag: 'lab-card-button',
    styleUrl: 'card-button.scss',
    shadow: true,
})
export class LabCardButton {
    /**
     * Evento disparado quando o card button for clicado
     */
    @Event() actionButtonClick: EventEmitter<MouseEvent>;

    /**
     * Indica se o componente está em edição
     */
    @Prop({
        reflect: false,
    })
    isEditing = false;

    /**
     * Imagem do avatar
     */
    @Prop() avatar: string;

    /**
     * Texto de descrição/apoio
     */
    @Prop() description = 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae';

    /**
     * Texto em destaque
     */
    @Prop() spotlight = 'lorem ipsum dolor';

    /**
     * Valor do card
     */
    @Prop() value = 'R$ 0,00';

    private onActionButtonClick = (ev: MouseEvent) => {
        this.actionButtonClick.emit(ev);
    };

    render() {
        return (
            <Host onClick={!this.isEditing ? this.onActionButtonClick : null}>
                <div
                    class={classnames('card-button', {
                        'card-button--editing': this.isEditing,
                    })}
                >
                    <apollo-avatar size="large" src={this.avatar}></apollo-avatar>
                    <div class="card-button-content">
                        {this.spotlight && <p class="card-button-content__spotlight">{this.spotlight}</p>}
                        <p class="card-button-content__value">{this.value}</p>
                        <p class="card-button-content__description">{this.description}</p>
                    </div>
                    <apollo-icon svgIcon="interface-angle-right-b" fill="#00AC4A"></apollo-icon>
                </div>
            </Host>
        );
    }
}
