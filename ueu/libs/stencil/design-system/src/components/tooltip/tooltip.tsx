import { Component, h, Listen, Prop, State } from '@stencil/core';
import className from 'classnames';
import { createPopper } from '@popperjs/core';
interface PopperStyles {
    [key: string]: string;
}
@Component({
    tag: 'apollo-tooltip',
    styleUrl: 'tooltip.scss',
    shadow: false,
})
export class ApolloTooltip {
    @State() isVisible = false;

    @Listen('focusin', { capture: true })
    onFocusIn() {
        this.isVisible = true;
    }
    @Listen('focusout', { capture: true })
    onFocusOut() {
        this.isVisible = false;
    }
    @Listen('mouseover', { capture: true })
    onMouseOver() {
        this.isVisible = true;
    }
    @Listen('mouseleave', { capture: true })
    onMouseLeave() {
        this.isVisible = false;
    }
    /**
     * Título do tooltip
     */
    @Prop() titleText: string;

    /**
     * Texto do tooltip
     */
    @Prop() description: string;

    /**
     * link
     */
    @Prop() linkUrl: string;

    /**
     * label do link
     */
    @Prop() linkLabel: string;

    /**
     * Posição do tooltip
     */
    @Prop() placement:
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end'
        | 'right'
        | 'right-start'
        | 'right-end'
        | 'left'
        | 'left-start'
        | 'left-end' = 'bottom';

    /**
     * Espaçamento do tooltip e o elemento chave
     */
    @Prop() offset = 0;

    /**
     * Margin ao ocorrer overflow
     */
    @Prop() margin = 0;

    /**
     * Tamanho do Potooltip
     */
    @Prop() size: 'sm' | 'md' | 'lg' = 'sm';

    /**
     * É um link externo?
     */
    @Prop()
    isExternal: boolean = false;

    componentDidRender() {
        this.createPopper();
    }

    private popperStyles: PopperStyles;
    private referenceElement: Element;
    private popperElement: HTMLElement;
    private arrowElement: HTMLElement;

    private createPopper() {
        const { state } = createPopper(this.referenceElement, this.popperElement, {
            placement: this.placement,
            modifiers: [
                {
                    name: 'arrow',
                    options: {
                        element: this.arrowElement,
                        padding: this.margin,
                    },
                },
                {
                    name: 'offset',
                    options: {
                        offset: [this.margin, this.offset],
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        altAxis: true,
                        padding: { top: this.margin, right: this.margin, bottom: this.margin, left: this.margin },
                    },
                },
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements: ['top', 'bottom', 'left', 'right'],
                    },
                },
            ],
        });

        this.popperStyles = state.styles as PopperStyles;
    }
    render() {
        return (
            <apollo-box
                class="tooltip tooltip__container"
                role="tooltip"
                aria-label="Conteúdo exibido ao passar o mouse ou ao focar o elemento"
            >
                <apollo-box ref={el => (this.referenceElement = el)}>
                    <slot></slot>
                </apollo-box>

                <apollo-flex
                    class={className(`tooltip tooltip__content tooltip__content--${this.size}`, {
                        'tooltip__content--hidden': !this.isVisible,
                    })}
                    ref={el => (this.popperElement = el)}
                    style={this.popperStyles}
                    direction="column"
                >
                    {this.titleText && (
                        <apollo-box pb="2">
                            <span class="tooltip tooltip__title">{this.titleText}</span>
                        </apollo-box>
                    )}
                    <span>{this.description}</span>
                    {this.linkUrl && (
                        <apollo-link class="tooltip__link" href={this.linkUrl} isExternal={this.isExternal}>
                            {this.linkLabel}
                        </apollo-link>
                    )}
                    <apollo-box
                        class={`tooltip tooltip__arrow tooltip__arrow--${this.placement}`}
                        ref={el => (this.arrowElement = el)}
                        style={this.popperStyles}
                    ></apollo-box>
                </apollo-flex>
            </apollo-box>
        );
    }
}
