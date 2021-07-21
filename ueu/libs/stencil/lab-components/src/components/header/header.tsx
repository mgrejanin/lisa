import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import classnNames from 'classnames';

@Component({
    tag: 'lab-header',
    styleUrl: 'header.scss',
    shadow: true,
})
export class LabHeader {
    /**
     * Evento disparado quando o botão "voltar" for clicado
     */
    @Event() backButtonClick: EventEmitter<MouseEvent>;
    /**
     * Evento disparado quando houver clique para editar o header
     */
    @Event() edit: EventEmitter<MouseEvent>;
    /**
     * Indica se o componente está em edição
     */
    @Prop({
        reflect: false,
    })
    isEditing: boolean = false;

    /**
     * Imagem do banner
     */
    @Prop() banner: string;

    /**
     * Imagem do avatar
     */
    @Prop() avatar: string;

    /**
     * Título do header
     */
    @Prop() pageTitle: string = 'Insira um título';

    private onBackButtonClick = (ev: MouseEvent) => {
        this.backButtonClick.emit(ev);
    };

    private onEdit = (ev: MouseEvent) => {
        this.edit.emit(ev);
    };

    render() {
        return (
            <Host>
                <div
                    class={classnNames('header', {
                        'header--editing': this.isEditing,
                    })}
                    onClick={this.onEdit}
                >
                    <apollo-icon-button
                        class="header__back-button"
                        color="#00AC4A"
                        iconPack="arrows"
                        icon="arrows-arrow-left"
                        onClick={this.onBackButtonClick}
                    />
                    <div
                        class={classnNames('header__banner', {
                            'header--to-edit': !this.banner,
                        })}
                    >
                        {this.banner ? (
                            <img class="header__banner-image" alt="banner" src={this.banner} />
                        ) : (
                            <div class="header__to-edit">
                                <apollo-icon
                                    svgIcon="multimedia-image-edit"
                                    size="md"
                                    role="img"
                                    class="header__icon"
                                ></apollo-icon>
                                <p class="header__edit-txt">Clique aqui para customizar sua loja</p>
                            </div>
                        )}
                    </div>
                    <div
                        class={classnNames('header__avatar', {
                            'header--editing': this.isEditing,
                        })}
                    >
                        <apollo-avatar size="xlarge" src={this.avatar}>
                            {!this.avatar && (
                                <apollo-icon
                                    svgIcon="multimedia-image-edit"
                                    size="md"
                                    role="img"
                                    class="header__icon"
                                ></apollo-icon>
                            )}
                        </apollo-avatar>
                    </div>
                    <div class="header__title">
                        <lab-title text={this.pageTitle}></lab-title>
                    </div>
                </div>
            </Host>
        );
    }
}
