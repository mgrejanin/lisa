import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

import classNames from 'classnames';

@Component({
    tag: 'lab-simple-header',
    styleUrl: 'simple-header.scss',
    shadow: true,
})
export class LabSimpleHeader {
    /**
     * Evento disparado quando o botão "voltar" for clicado
     */
    @Event() backButtonClick: EventEmitter<MouseEvent>;

    /**
     * Indica se o componente está em edição
     */
    @Prop({
        reflect: false,
    })
    isEditing = false;

    /**
     * Título da tela
     */
    @Prop() pageTitle = 'Título';

    private onBackButtonClick = (ev: MouseEvent) => {
        this.backButtonClick.emit(ev);
    };

    render() {
        return (
            <Host>
                <div
                    class={classNames('simple-header', {
                        'simple-header--is-editing': this.isEditing,
                    })}
                >
                    <apollo-icon-button
                        class="simple-header__back-button"
                        color="#00AC4A"
                        iconPack="arrows"
                        icon="arrows-arrow-left"
                        onClick={this.onBackButtonClick}
                    />
                    <p class="simple-header__title">{this.pageTitle}</p>
                </div>
            </Host>
        );
    }
}
