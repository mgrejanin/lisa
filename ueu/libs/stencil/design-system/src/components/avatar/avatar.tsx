import { Component, h, Host, Prop } from '@stencil/core';
import classNames from 'classnames';

@Component({
    tag: 'apollo-avatar',
    styleUrl: 'avatar.scss',
    shadow: false,
})
export class Avatar {
    /**
     * Borda do avatar
     * @prop reflect: O CSS usa a referência do atributo no elemento para aplicar algumas regras
     */
    @Prop({
        reflect: true,
    })
    border: 'none' | 'light' | 'medium' | 'strong' = 'light';

    /**
     * Imagem do avatar
     * @prop reflect: O CSS usa a referência do atributo no elemento para aplicar algumas regras
     */
    @Prop({
        reflect: true,
    })
    src = '';

    /**
     * Alt da imagem do avatar
     * @prop reflect: O CSS usa a referência do atributo no elemento para aplicar algumas regras
     */
    @Prop({
        reflect: true,
    })
    alt = '';

    /**
     * Radius do avatar
     * @prop reflect: O CSS usa a referência do atributo no elemento para aplicar algumas regras
     */
    @Prop({
        reflect: true,
    })
    radius: 'none' | 'light' | 'medium' | 'strong' | 'full' = 'full';

    /**
     * Tamanho do avatar
     * @prop reflect: O CSS usa a referência do atributo no elemento para aplicar algumas regras
     */
    @Prop({
        reflect: true,
    })
    size: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' = 'medium';

    render() {
        return (
            <Host
                class={classNames(
                    `apollo-avatar`,
                    `apollo-avatar__size-${this.size}`,
                    `apollo-avatar__border-${this.border}`,
                    `apollo-avatar__radius-${this.radius}`,
                )}
                style={{
                    backgroundImage: `url(${
                        this.src?.length > 0 ? this.src : './assets/design-system/avatar/avatar_default.png'
                    })`,
                }}
            ></Host>
        );
    }
}
