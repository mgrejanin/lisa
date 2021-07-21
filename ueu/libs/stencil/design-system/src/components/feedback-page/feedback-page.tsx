import { Component, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'apollo-feedback-page',
    styleUrl: 'feedback-page.scss',
    shadow: false,
})
export class ApolloFeedbackPage {
    private typesConfig = {
        info: { modifier: 'info', icon: 'feedback-info', figure: 'info_figure' },
        done: { modifier: 'done', icon: 'feedback-success', figure: 'check_figure' },
        warning: { modifier: 'warning', icon: 'feedback-danger', figure: 'warning_figure' },
        error: { modifier: 'error', icon: 'feedback-exclamation-circle', figure: 'error_figure' },
    };

    /**
     * Tipo da feedback page
     */
    @Prop()
    type: 'info' | 'done' | 'warning' | 'error';

    /**
     * Título da feedback page
     */
    @Prop()
    pageTitle: string;

    /**
     * Subtítulo da feedback page
     */
    @Prop()
    pageSubtitle: string;

    /**
     * Seta a versão Figure
     */
    @Prop()
    useFigure = false;

    componentDidLoad() {
        const isTypeUndef = !this.typesConfig[this.type] && process.env.NODE_ENV === 'development';
        const supportedTypes = Object.keys(this.typesConfig).join(', ');

        if (isTypeUndef) {
            console.warn(
                `O tipo "${this.type}" não existe no feedback page. Os tipos possíveis são: ${supportedTypes}`,
            );
        }
    }

    render() {
        const currentType = this.typesConfig[this.type] || { modifier: '', icon: '', figure: '' };

        return (
            <Host>
                <div class="apollo-feedback-page">
                    <div class="apollo-feedback-page__container">
                        <div class="apollo-feedback-page__surface">
                            <div class="apollo-feedback-page__header">
                                {this.typesConfig[this.type] !== undefined ? (
                                    <div class="apollo-feedback-page__type">
                                        {this.useFigure ? (
                                            <img
                                                class="apollo-feedback-page__figure"
                                                src={`./assets/design-system/figures/${currentType.figure}.svg`}
                                            />
                                        ) : (
                                            <apollo-icon svgIcon={currentType.icon} size="lg"></apollo-icon>
                                        )}
                                    </div>
                                ) : null}

                                <div class="apollo-feedback-page__title">
                                    <h3>{this.pageTitle}</h3>
                                    <span>{this.pageSubtitle}</span>
                                </div>
                            </div>

                            <div class="apollo-feedback-page__content">
                                <slot></slot>
                            </div>
                        </div>
                    </div>
                </div>
            </Host>
        );
    }
}
