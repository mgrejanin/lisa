import { Component, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';

@Component({
    tag: 'apollo-feedback-dialog',
    styleUrl: 'feedback-dialog.scss',
    shadow: false,
})
export class ApolloFeedbackDialog {
    private dialogElement: HTMLApolloDialogElement;

    private typeFigurePath = './assets/design-system/figures/';
    private typesConfig = {
        info: {
            modifier: 'info',
            icon: 'info_outline',
            figure: `${this.typeFigurePath}info_figure.svg`,
            svgIcon: 'feedback-info',
        },
        done: {
            modifier: 'done',
            icon: 'check_circle_outline',
            figure: `${this.typeFigurePath}check_figure.svg`,
            svgIcon: 'feedback-success',
        },
        warning: {
            modifier: 'warning',
            icon: 'warning',
            figure: `${this.typeFigurePath}warning_figure.svg`,
            svgIcon: 'feedback-danger',
        },
        error: {
            modifier: 'error',
            icon: 'error_outline',
            figure: `${this.typeFigurePath}error_figure.svg`,
            svgIcon: 'feedback-exclamation-circle',
        },
    };

    /**
     * Evento disparado quando o botão de confirm for clicado
     */
    @Event() confirmFeedbackButtonClick: EventEmitter<CustomEvent>;

    /**
     * Evento disparado quando o botão de cancel for clicado
     */
    @Event() cancelFeedbackButtonClick: EventEmitter<CustomEvent>;

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
     * Tipo do dialog
     */
    @Prop()
    type: 'info' | 'done' | 'warning' | 'error';

    /**
     * Seta a versão Large do ícone para devices mobile
     */
    @Prop()
    useFigureVersionForMobile = false;

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
     * API para abrir o dialog
     */
    @Method()
    async open() {
        this.dialogElement.open();
    }

    /**
     * API para fechar o dialog
     */
    @Method()
    async close() {
        this.dialogElement.close();
    }

    componentDidLoad() {
        this.dialogElement = document.querySelector('apollo-dialog');
        const isTypeUndef = !this.typesConfig[this.type] && process.env.NODE_ENV === 'development';
        const supportedTypes = Object.keys(this.typesConfig).join(', ');

        if (isTypeUndef) {
            console.warn(`O tipo "${this.type}" não existe no dialog. Os tipos possíveis são: ${supportedTypes}`);
        }
    }

    private onConfirmFeedbackButtonClick = (ev: CustomEvent) => {
        this.confirmFeedbackButtonClick.emit(ev);
    };

    private onCancelFeedbackButtonClick = (ev: CustomEvent) => {
        this.cancelFeedbackButtonClick.emit(ev);
    };

    render() {
        const currentType = this.typesConfig[this.type] || { modifier: '', icon: '', figure: '', svgIcon: '' };
        const cancelButtonLabel = this.cancelButtonLabel || 'Cancelar';
        const confirmButtonLabel = this.confirmButtonLabel || 'Confirmar';

        return (
            <Host>
                <apollo-dialog
                    dialog-title={this.dialogTitle}
                    dialog-subtitle={this.dialogSubtitle}
                    cancel-button-label={cancelButtonLabel}
                    confirm-button-label={confirmButtonLabel}
                    icon={currentType.svgIcon}
                    onCancelButtonClick={this.onCancelFeedbackButtonClick}
                    onConfirmButtonClick={this.onConfirmFeedbackButtonClick}
                    figure={this.useFigureVersionForMobile ? currentType.figure : ''}
                    ref={el => (this.dialogElement = el as HTMLApolloDialogElement)}
                >
                    <slot></slot>
                </apollo-dialog>
            </Host>
        );
    }
}
