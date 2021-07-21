import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

import { ALLOWED_ANIMATIONS, SIZES_CONFIG } from './skeleton.constants';

@Component({
    tag: 'apollo-skeleton',
    styleUrl: 'skeleton.scss',
    shadow: false,
})
export class Skeleton {
    private items: number[] = [];

    /**
     * Quantidade de skeletons a serem carregados
     */
    @Prop()
    count: number = 1;

    /**
     * Estilo do skeleton
     */
    @Prop({ reflect: true })
    variant: 'circle' | 'rect' | 'text' | 'pill' = 'text';

    /**
     * Largura do skeleton ex. 100px, 100%, auto etc.
     */
    @Prop()
    width: string = null;

    /**
     * Altura do skeleton ex. 100px, 100%, auto etc.
     */
    @Prop()
    height: string = null;

    /**
     * Seleciona valores padrões de um template definido no CSS
     */
    @Prop()
    templateWidth: boolean = false;

    /**
     * Tipo de animação
     */
    @Prop({ mutable: true })
    animation: 'progress' | 'progress-dark' | 'pulse' | 'false' = 'progress';

    /**
     * Tamanhos pré definidos, sobrescreve as propriedades width e height.
     */
    @Prop({
        mutable: true,
    })
    size: 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg' | 'xxxlg' = null;

    /**
     * Custom css styles (background/margins/width/height etc.)
     */
    @Prop({
        mutable: true,
    })
    customStyles: { [key: string]: string } | string = {};

    /**
     * Habilita os warnings para animações não suportadas
     */
    @Prop() showWarnings = true;

    componentWillLoad() {
        this.init();
    }

    componentWillUpdate() {
        this.init();
    }

    init() {
        this.items.length = this.count;
        this.items.fill(1);

        if (ALLOWED_ANIMATIONS.indexOf(this.animation) <= -1) {
            if (this.showWarnings) {
                console.warn(
                    `\`Skeleton\` necessita receber a prop 'animation' como: ${ALLOWED_ANIMATIONS.join(
                        ', ',
                    )}. Forçando o default para 'progress'.`,
                );
            }

            this.animation = 'progress';
        }

        if (this.size?.length > 0 && typeof SIZES_CONFIG[this.size] === 'undefined') {
            if (this.showWarnings) {
                console.warn(
                    `\`Skeleton\` necessita receber a prop 'size' como: ${Object.keys(SIZES_CONFIG).join(
                        ', ',
                    )}. Forçando o default para 'sm'.`,
                );
            }

            this.size = 'sm';
        }

        if (this.customStyles && typeof this.customStyles === 'string') {
            try {
                this.customStyles = JSON.parse(this.customStyles);
            } catch (error) {
                if (this.showWarnings) {
                    console.warn(`can't parse styles`, this.customStyles);
                }
            }
        }
    }

    get style() {
        let dimenssionsStyles: {
            width?: string;
            height?: string;
        } = {
            width: null,
            height: null,
        };

        if (this.size === null && this.width?.length > 0) {
            dimenssionsStyles.width = this.width;
        }

        if (this.size === null && this.height?.length > 0) {
            dimenssionsStyles.height = this.height;
        }

        if (this.size?.length > 0) {
            dimenssionsStyles.height = SIZES_CONFIG[this.size];
            dimenssionsStyles.width = SIZES_CONFIG[this.size];
        }

        const styles = typeof this.customStyles === 'object' ? this.customStyles : {};

        return { ...dimenssionsStyles, ...styles };
    }

    render() {
        return (
            <Host>
                {this.items.map((_, index) => {
                    return (
                        <span
                            key={index}
                            class={classNames('apollo-skeleton', {
                                'apollo-skeleton--circle': this.variant === 'circle',
                                'apollo-skeleton--rect': this.variant === 'rect',
                                'apollo-skeleton--pill': this.variant === 'pill',
                                'apollo-skeleton--progress': this.animation === 'progress',
                                'apollo-skeleton--progress-dark': this.animation === 'progress-dark',
                                'apollo-skeleton--pulse': this.animation === 'pulse',
                                'apollo-skeleton--template-width': this.templateWidth,
                            })}
                            aria-busy="true"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuetext="Carregando..."
                            role="progressbar"
                            tabindex="0"
                            style={this.style}
                        ></span>
                    );
                })}
            </Host>
        );
    }
}
