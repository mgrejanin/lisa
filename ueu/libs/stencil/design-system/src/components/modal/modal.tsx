import { MDCDialog } from '@material/dialog';
import { Component, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
    tag: 'apollo-modal',
    styleUrl: 'modal.scss',
    shadow: false,
})
export class ApolloModal {
    private dialogElement: HTMLDivElement;
    private dialog: MDCDialog;

    /**
     * Evento disparado quando o botão de fechar o modal for clicado
     */
    @Event() closeModal: EventEmitter<MouseEvent>;

    /**
     * Título do dialog
     */
    @Prop()
    modalTitle: string;

    /**
     * Subtitulo do dialog
     */
    @Prop()
    modalSubtitle: string;

    /**
     * Ícone da dialog
     */
    @Prop()
    icon: string;

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

    private onCloseModal = (ev: MouseEvent) => {
        this.closeModal.emit(ev);
    };

    disconnectedCallback() {
        this.dialog.destroy();
    }

    render() {
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
                                    <h3>{this.modalTitle}</h3>
                                    <span>{this.modalSubtitle}</span>
                                </div>
                                <apollo-icon-button
                                    class="mdc-dialog__close"
                                    data-mdc-dialog-action="cancel"
                                    icon="interface-multiply"
                                    icon-pack="interface"
                                    label-off="Fechar janela"
                                    size="md"
                                    onClick={this.onCloseModal}
                                ></apollo-icon-button>
                            </div>
                            <div class="mdc-dialog__content" id="my-dialog-content">
                                <slot></slot>
                            </div>
                        </div>
                    </div>
                    <div class="mdc-dialog__scrim"></div>
                </div>
            </Host>
        );
    }
}
