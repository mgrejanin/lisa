import { MDCSnackbar } from '@material/snackbar';
import { Component, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
    tag: 'apollo-snackbar',
    styleUrl: 'snackbar.scss',
    shadow: false,
})
export class ApolloSnackbar {
    private snackbarElement: HTMLDivElement;
    private snackbar: MDCSnackbar;
    private typesConfig = {
        info: { modifier: 'info', icon: 'interface-info-circle' },
        done: { modifier: 'done', icon: 'interface-check-circle' },
        warning: { modifier: 'warning', icon: 'location-exclamation-triangle' },
        error: { modifier: 'error', icon: 'location-exclamation-circle' },
    };

    /**
     * Evento disparado quando o botão de ação for clicado
     */
    @Event() actionButtonClick: EventEmitter<MouseEvent>;

    /**
     * Label do botão
     */
    @Prop()
    actionButtonLabel: string;

    /**
     * Ativa ênfase no snackbar
     */
    @Prop()
    emphasis: boolean;

    /**
     * Label da snackbar
     */
    @Prop({ mutable: true })
    label: string;

    /**
     * Renderiza um botão com a função de fechar o snackbar quando clicado
     */
    @Prop()
    showDismissButton = false;

    /**
     * Renderiza o snackbar no modo stacked
     */
    @Prop()
    stacked = false;

    /**
     * Tipo do snackbar
     */
    @Prop({ reflect: true })
    type: 'info' | 'done' | 'warning' | 'error' = 'done';

    /**
     *  Posição do snackbar
     */
    @Prop()
    position: 'baseline' | 'leading' = 'leading';

    /**
     * API para abrir o snackbar
     * @param timeout tempo que o snackbar ficará visível em milisegundos. Deve ser maior que 4000 e menor 10000,
     * ou -1 para desativar o timeout
     */
    @Method()
    async open(timeout: number = 5000) {
        this.snackbar.timeoutMs = timeout;
        this.snackbar.open();
    }

    /**
     * API para fechar o snackbar
     */
    @Method()
    async close() {
        this.snackbar.close();
    }

    /**
     * API para alterar a label do snackbar
     */
    @Method()
    async setLabel(label: string) {
        this.snackbar.labelText = label;
        this.label = label;
    }

    componentDidLoad() {
        this.snackbar = new MDCSnackbar(this.snackbarElement);

        const isTypeUndef = !this.typesConfig[this.type] && process.env.NODE_ENV === 'development';
        const supportedTypes = Object.keys(this.typesConfig).join(', ');

        if (isTypeUndef) {
            console.warn(`O tipo "${this.type}" não existe no snackbar. Os tipos possíveis são: ${supportedTypes}`);
        }
    }

    private snackbarElementRef = (element: HTMLDivElement) => {
        this.snackbarElement = element;
    };

    private onActionButtonClick = (ev: MouseEvent) => this.actionButtonClick.emit(ev);

    disconnectedCallback() {
        this.snackbar.destroy();
    }

    render() {
        const currentType = this.typesConfig[this.type] || { modifier: '', icon: '' };

        return (
            <Host>
                <div
                    class={classNames('mdc-snackbar', {
                        'mdc-snackbar--emphasis': this.emphasis,
                        'mdc-snackbar--not-emphasis': !this.emphasis,
                        'mdc-snackbar--leading': this.position === 'leading',
                    })}
                    ref={this.snackbarElementRef}
                >
                    <div
                        class={classNames('mdc-snackbar__surface', {
                            'mdc-snackbar__surface__wrap__label': this.stacked,
                        })}
                    >
                        <div class="mdc-snackbar__surface__container">
                            <apollo-icon
                                class={`mdc-snackbar__surface__icon--${currentType.modifier}`}
                                svgIcon={currentType.icon}
                            ></apollo-icon>
                            <div class="mdc-snackbar__label" role="status" aria-live="polite">
                                {this.snackbar?.labelText || this.label}
                            </div>
                        </div>
                        <div class="mdc-snackbar__actions">
                            {this.actionButtonLabel?.length > 0 ? (
                                <apollo-button variant="link" size="sm" onClick={this.onActionButtonClick}>
                                    {this.actionButtonLabel}
                                </apollo-button>
                            ) : null}

                            {this.showDismissButton ? (
                                <apollo-icon-button
                                    size="sm"
                                    class="mdc-snackbar__dismiss"
                                    icon="close"
                                ></apollo-icon-button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </Host>
        );
    }
}
