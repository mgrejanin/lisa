import { Component, h, Host, Event, EventEmitter, Prop, State } from '@stencil/core';

@Component({
    tag: 'apollo-search-bar',
    styleUrl: 'search-bar.scss',
})
export class SearchBar {
    /**
     * Evento disparado quando o usuário termina de digitar e o tempo de atraso de envio do evento for concluído
     */
    @Event() apolloChange: EventEmitter;

    /**
     * Evento disparado quando o campo recebe foco
     */
    @Event() apolloFocus: EventEmitter<FocusEvent>;

    /**
     * Evento disparado quando o campo perde o foco
     */
    @Event() apolloBlur: EventEmitter<FocusEvent>;

    onInput = ev => {
        this.value = ev.currentTarget.value;
        this.hasValue = this.value !== '';

        this.apolloChange.emit(ev);
    };

    onFocus = (ev: FocusEvent) => {
        this.apolloFocus.emit(ev);
    };

    onBlur = (ev: FocusEvent) => {
        this.apolloBlur.emit(ev);
    };

    /**
     * Seta o valor do input
     */
    @Prop({ mutable: true })
    value: string;

    /**
     * Estado para identificar se existe texto no input
     */
    @State() hasValue: boolean;

    clearValue = () => {
        this.value = null;
        this.hasValue = false;
    };

    render() {
        return (
            <Host class="apollo-search-bar">
                <apollo-box
                    class="apollo-search-bar-container"
                    borderRadius="strong"
                    backgroundColor="grayscale.50"
                    height="40px"
                    maxW="450px"
                    justify="center"
                    display="flex"
                >
                    <input
                        onInput={this.onInput}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        value={this.value}
                        type="search"
                        name="search"
                        autoComplete="off"
                        required
                        placeholder="Pesquisar"
                    />

                    <apollo-stack class="search-overlay">
                        <apollo-icon svgIcon="interface-search" fill="#318C6E"></apollo-icon>
                        <apollo-box paddingLeft="1">
                            <apollo-text>Pesquisar</apollo-text>
                        </apollo-box>
                    </apollo-stack>
                    <apollo-textfield-icon
                        onClick={this.clearValue}
                        onApolloKeyUp={this.clearValue}
                        style={this.hasValue ? { visibility: 'visible' } : { visibility: 'hidden' }}
                    >
                        <apollo-icon svgIcon="interface-times"></apollo-icon>
                    </apollo-textfield-icon>
                </apollo-box>
            </Host>
        );
    }
}
