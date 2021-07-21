import { Component, h, Prop, Host, EventEmitter, Event } from '@stencil/core';

@Component({
    tag: 'apollo-toolbar',
    styleUrl: 'toolbar.scss',
})
export class Toolbar {
    /**
     * Adiciona um campo de pesquisa principal
     */
    @Prop()
    isSearch: boolean = false;

    /**
     * Evento disparado quando o usuário termina de digitar e o tempo de atraso de envio do evento for concluído
     */
    @Event() apolloSearchChange: EventEmitter<InputEvent>;

    /**
     * Evento disparado quando o campo recebe foco
     */
    @Event() apolloSearchFocus: EventEmitter<FocusEvent>;

    /**
     * Evento disparado quando o campo perde o foco
     */
    @Event() apolloSearchBlur: EventEmitter<FocusEvent>;

    onInput = (ev: InputEvent) => {
        this.apolloSearchChange.emit(ev);
    };

    onFocus = (ev: FocusEvent) => {
        this.apolloSearchFocus.emit(ev);
    };

    onBlur = (ev: FocusEvent) => {
        this.apolloSearchBlur.emit(ev);
    };

    render() {
        return (
            <Host>
                <apollo-box backgroundColor="white" padding="3" boxShadow="medium">
                    <apollo-flex spacer alignItems="center">
                        <slot name="start"></slot>
                        <apollo-flex grow={1}>
                            <apollo-box paddingLeft="2" paddingRight="2">
                                <apollo-stack spacing="2">
                                    <slot></slot>
                                </apollo-stack>
                            </apollo-box>
                        </apollo-flex>
                        {this.isSearch ? (
                            <apollo-search-bar
                                on-apolloChange={this.onInput}
                                on-apolloFocus={this.onFocus}
                                on-apolloBlur={this.onBlur}
                            ></apollo-search-bar>
                        ) : null}
                        <slot name="end"></slot>
                    </apollo-flex>
                </apollo-box>
            </Host>
        );
    }
}
