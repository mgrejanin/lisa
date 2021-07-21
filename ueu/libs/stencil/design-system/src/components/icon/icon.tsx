import { Component, h, Host, Prop, State } from '@stencil/core';
import { setPropStyle } from '../../helpers/set-prop-style';

@Component({
    tag: 'apollo-icon',
    styleUrl: 'icon.scss',
    shadow: false,
})
export class Icon {
    /**
     * O tamanho do ícone
     */
    @Prop() size: 'sm' | 'md' | 'lg' = 'md';

    /**
     * Cor do ícone. Tokens DS.
     */
    @Prop() color: string;

    /**
     * O nome do ícone SVG.
     */
    @Prop()
    svgIcon: string;

    /**
     * O tipo do ícone SVG
     */
    @Prop({ mutable: true })
    typeIcon: string;

    /**
     * O atributo que define a função.
     */
    @Prop()
    role: string;

    /**
     * Texto de ajuda. Para acessibilidade.
     */
    @Prop()
    label: string;

    /**
     * Cor do ícone. Hexadecimal.
     */
    @Prop()
    fill: string;

    /**
     * O atributo diâmetro (definirá a largura e a altura do SVG).
     */
    @State() diameter: number;

    componentWillRender() {
        if (this.svgIcon) {
            let icon = this.svgIcon;
            let type = icon.split('-');

            this.typeIcon = type[0];
        }

        this.renderSize();
    }

    private renderSize() {
        switch (this.size) {
            case 'sm':
                this.diameter = 16;
                break;
            case 'md':
                this.diameter = 24;
                break;
            case 'lg':
                this.diameter = 40;
                break;
            default:
                this.diameter = 16;
                break;
        }
    }

    render() {
        if (this.svgIcon === undefined && this.typeIcon === undefined) {
            return (
                <Host style={{ fontSize: this.size, color: this.fill }} class={setPropStyle(this)} aria-hidden="true">
                    <slot></slot>
                </Host>
            );
        }

        return (
            <Host class="apollo-icon--svg">
                <svg
                    viewBox={`0 0 ${this.diameter} ${this.diameter}`}
                    width={this.diameter}
                    height={this.diameter}
                    role={this.role}
                    fill={this.fill}
                    color={this.fill}
                    aria-label={this.label}
                    class={setPropStyle(this)}
                >
                    <use xlinkHref={`./assets/design-system/icons/${this.typeIcon}.svg#${this.svgIcon}`} />
                </svg>
            </Host>
        );
    }
}
