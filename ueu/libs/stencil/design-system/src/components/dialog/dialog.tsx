import { MDCDialog } from '@material/dialog';
import { Component, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
    tag: 'apollo-dialog',
    styleUrl: 'dialog.scss',
    shadow: false,
})
export class ApolloDialog {
    private dialogElement: HTMLDivElement;
    private dialog: MDCDialog;

    /**
     * Evento disparado quando o botão de confirm for clicado
     */
    @Event() confirmButtonClick: EventEmitter<MouseEvent>;

    /**
     * Evento disparado quando o botão de cancel for clicado
     */
    @Event() cancelButtonClick: EventEmitter<MouseEvent>;

    /**
     * Título do dialog
     */
    @Prop()
    dialogTitle: string;

    /**
     * Subtitulo do dialog
     */
    @Prop()
    dialogSubtitle: string;

    /**
     * Ícone da dialog
     */
    @Prop()
    icon: string;

    /**
     * Label do botão confirmar
     */
    @Prop()
    confirmButtonLabel: string;

    /**
     * Label do botão cancelar
     */
    @Prop()
    cancelButtonLabel: string;

    /**
     * Seta a versão Large do ícone para devices mobile
     */
    @Prop()
    figure: string;

    /**
     * API para abrir o dialog
     */
    @Method()
    async open() {
        this.dialog.open();
    }

    /**
     * API para fechar o dialog
     */
    @Method()
    async close() {
        this.dialog.close();
    }

    componentDidLoad() {
        this.dialog = new MDCDialog(this.dialogElement);
    }

    private dialogElementRef = (element: HTMLDivElement) => {
        this.dialogElement = element;
    };

    private onConfirmButtonClick = (ev: MouseEvent) => {
        this.confirmButtonClick.emit(ev);
    };

    private onCancelButtonClick = (ev: MouseEvent) => {
        this.cancelButtonClick.emit(ev);
    };

    disconnectedCallback() {
        this.dialog.destroy();
    }

    render() {
        const cancelButtonLabel = this.cancelButtonLabel || 'Cancelar';
        const confirmButtonLabel = this.confirmButtonLabel || 'Confirmar';

        return (
            <Host>
                <div class="mdc-dialog" ref={this.dialogElementRef}>
                    <div class="mdc-dialog__container">
                        <div
                            class="mdc-dialog__surface"
                            role="alertdialog"
                            aria-modal="true"
                            aria-labelledby="my-dialog-title"
                            aria-describedby="my-dialog-content"
                        >
                            <div class="mdc-dialog__title" id="my-dialog-title">
                                {this.icon && (
                                    <div>
                                        {this.figure?.length >= 1 && (
                                            <div class="mdc-dialog__title__figure__display">
                                                <img src={`${this.figure}`} />
                                            </div>
                                        )}

                                        <div
                                            class={classNames('mdc-dialog__title__icon', {
                                                'mdc-dialog__title__icon__display': this.figure?.length >= 1,
                                            })}
                                        >
                                            <apollo-icon svgIcon={this.icon} size="lg"></apollo-icon>
                                        </div>
                                    </div>
                                )}

                                <div class="mdc-dialog__title__text">
                                    <h3>{this.dialogTitle}</h3>
                                    <span>{this.dialogSubtitle}</span>
                                </div>
                                <apollo-icon-button
                                    class="mdc-dialog__close"
                                    data-mdc-dialog-action="cancel"
                                    icon="interface-multiply"
                                    icon-pack="interface"
                                    label-off="Fechar janela"
                                    size="md"
                                    onClick={this.onCancelButtonClick}
                                ></apollo-icon-button>
                            </div>

                            <div class="mdc-dialog__content" id="my-dialog-content">
                                <slot></slot>
                            </div>
                            <div class="mdc-dialog__actions">
                                <apollo-button
                                    variant="link"
                                    size="md"
                                    data-mdc-dialog-action="cancel"
                                    onClick={this.onCancelButtonClick}
                                >
                                    {cancelButtonLabel}
                                </apollo-button>
                                <apollo-button
                                    variant="unelevated"
                                    size="md"
                                    data-mdc-dialog-action="accept"
                                    onClick={this.onConfirmButtonClick}
                                >
                                    {confirmButtonLabel}
                                </apollo-button>
                            </div>
                        </div>
                    </div>
                    <div class="mdc-dialog__scrim"></div>
                </div>
            </Host>
        );
    }
}
