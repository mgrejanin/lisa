import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

import { SIZES_CONFIG } from './../skeleton.constants';

@Component({
    tag: 'apollo-template-skeleton',
    styleUrl: 'template-skeleton.scss',
    shadow: false,
})
export class TemplateSkeleton {
    private items: number[] = [];

    /**
     * Alinhamento dos skeletons
     */
    @Prop()
    align: 'center' | 'left' | 'right' = 'left';

    /**
     * Quantidade de templates skeletons a serem carregados
     */
    @Prop()
    count: number = 1;

    /**
     * Define se o template irá exibir o skeleton de avatar
     */
    @Prop()
    avatar: boolean = false;

    /**
     * Tamanhos pré definidos para o avatar.
     */
    @Prop({ mutable: true })
    avatarSize: 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg' | 'xxxlg' = 'sm';

    /**
     * Estilo do template skeleton
     */
    @Prop({ reflect: true })
    textVariant: 'rect' | 'text' | 'pill' = 'text';

    /**
     * Altura do skeleton ex. 100px, 100%, auto etc.
     */
    @Prop()
    textHeight: string = '16px';

    /**
     * Quantidade de skeletons do tipo texto a serem carregados
     */
    @Prop()
    textCount: number = 1;

    /**
     * Habilita os warnings
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

        if (this.avatarSize?.length > 0 && typeof SIZES_CONFIG[this.avatarSize] === 'undefined') {
            if (this.showWarnings) {
                console.warn(
                    `\`Skeleton\` necessita receber a prop 'size' como: ${Object.keys(SIZES_CONFIG).join(
                        ', ',
                    )}. Forçando o default para 'sm'.`,
                );
            }

            this.avatarSize = 'sm';
        }
    }

    render() {
        return (
            <Host>
                {this.items.map((_, index) => {
                    return (
                        <div
                            key={index}
                            class={classNames(`template-skeleton template-skeleton--align-${this.align}`, {
                                'template-skeleton--row-reverse': this.align === 'right',
                                'template-skeleton--direction-column': this.align === 'center',
                            })}
                        >
                            {this.avatar && (
                                <div class="container-skeleton--avatar">
                                    <apollo-skeleton variant="circle" size={this.avatarSize}></apollo-skeleton>
                                </div>
                            )}

                            <div class="container-skeleton--text">
                                <apollo-skeleton
                                    variant={this.textVariant}
                                    height={this.textHeight}
                                    count={this.textCount}
                                    template-width
                                ></apollo-skeleton>
                            </div>
                        </div>
                    );
                })}
            </Host>
        );
    }
}
