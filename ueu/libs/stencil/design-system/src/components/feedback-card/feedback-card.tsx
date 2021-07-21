import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
    tag: 'apollo-feedback-card',
    styleUrl: 'feedback-card.scss',
    shadow: false,
})
export class ApolloFeedbackCard {
    private typesConfig = {
        info: { modifier: 'info', icon: 'interface-info-circle' },
        done: { modifier: 'done', icon: 'interface-check-circle' },
        warning: { modifier: 'warning', icon: 'location-exclamation-triangle' },
        error: { modifier: 'error', icon: 'location-exclamation-circle' },
    };

    /**
     * Ativa ênfase no card
     */
    @Prop()
    emphasis: boolean;

    /**
     * Label do card
     */
    @Prop()
    label: string;

    /**
     * Renderiza o card no modo stacked
     */
    @Prop()
    stacked = false;

    /**
     * Tipo do card
     */
    @Prop({ reflect: true })
    type: 'info' | 'done' | 'warning' | 'error' = 'done';

    render() {
        const currentType = this.typesConfig[this.type] || { modifier: '', icon: '' };

        return (
            <Host>
                <div
                    class={classNames('feedback-card', {
                        'feedback-card--emphasis': this.emphasis,
                        'feedback-card--not-emphasis': !this.emphasis,
                    })}
                >
                    <div
                        class={classNames('feedback-card__surface', {
                            'feedback-card__surface__wrap__label': this.stacked,
                        })}
                    >
                        <div class="feedback-card__surface__container">
                            <apollo-icon
                                class={`feedback-card__surface__icon--${currentType.modifier}`}
                                svgIcon={currentType.icon}
                            ></apollo-icon>
                            <div class="feedback-card__label" role="status" aria-live="polite">
                                {this.label}
                            </div>
                        </div>

                        <div class="feedback-card__actions">
                            <slot />
                        </div>
                    </div>
                </div>
            </Host>
        );
    }
}
