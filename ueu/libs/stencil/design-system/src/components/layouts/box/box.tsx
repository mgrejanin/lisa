import { Component, h, Prop, Host } from '@stencil/core';

import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';

import { ResponsiveProp } from './../../../helpers/responsive.helper';
import { setPropStyle } from './../../../helpers/set-prop-style';

export type FontFamily = ResponsiveProp<keyof typeof Token.fontFamily>;
export type FontSize = ResponsiveProp<keyof typeof Token.fontSize>;
export type FontWeight = ResponsiveProp<keyof typeof Token.fontWeight>;
export type LineHeight = ResponsiveProp<keyof typeof Token.lineHeight>;

export type BorderRadius = ResponsiveProp<keyof typeof Token.borderRadius>;
export type BorderWidth = ResponsiveProp<keyof typeof Token.borderWidth>;

export type Color = ResponsiveProp<keyof typeof Token.colors>;
export type Opacity = ResponsiveProp<keyof typeof Token.opacity>;
export type Shadow = ResponsiveProp<keyof typeof Token.boxShadow>;
export type Spacing = ResponsiveProp<keyof typeof Token.spacing>;
export type Align = ResponsiveProp<'flex-start' | 'center' | 'flex-end'>;
export type Justify = ResponsiveProp<
    'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
>;

@Component({
    tag: 'apollo-box',
    styleUrl: 'box.scss',
    shadow: false,
})
export class Box {
    /**
     * Abreviação de propriedade de estilo `backgroundColor`
     */
    @Prop()
    backgroundColor: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `backgroundColor`
     */
    @Prop()
    bg: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `color`
     */
    @Prop()
    color: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `padding`
     */
    @Prop()
    padding: Spacing;

    /**
     * Abreviação de propriedade de estilo `padding`
     */
    @Prop()
    p: Spacing;

    /**
     * Abreviação de propriedade de estilo `paddingTop`
     */
    @Prop()
    paddingTop: Spacing;

    /**
     * Abreviação de propriedade de estilo `paddingTop`
     */
    @Prop()
    pt: Spacing;

    /**
     * Abreviação de propriedade de estilo `paddingRight`
     */
    @Prop()
    paddingRight: Spacing;

    /**
     * Abreviação de propriedade de estilo `paddingRight`
     */
    @Prop()
    pr: Spacing;

    /**
     * Abreviação de propriedade de estilo `paddingBottom`
     */
    @Prop()
    paddingBottom: Spacing;

    /**
     * Abreviação de propriedade de estilo `paddingBottom`
     */
    @Prop()
    pb: Spacing;

    /**
     * Abreviação de propriedade de estilo `paddingLeft`
     */
    @Prop()
    paddingLeft: Spacing;

    /**
     * Abreviação de propriedade de estilo `paddingLeft`
     */
    @Prop()
    pl: Spacing;

    /**
     * Abreviação de propriedade de estilo `margin`
     */
    @Prop()
    margin: Spacing;

    /**
     * Abreviação de propriedade de estilo `margin`
     */
    @Prop()
    m: Spacing;

    /**
     * Abreviação de propriedade de estilo `marginTop`
     */
    @Prop()
    marginTop: Spacing;

    /**
     * Abreviação de propriedade de estilo `marginTop`
     */
    @Prop()
    mt: Spacing;

    /**
     * Abreviação de propriedade de estilo `marginRight`
     */
    @Prop()
    marginRight: Spacing;

    /**
     * Abreviação de propriedade de estilo `marginRight`
     */
    @Prop()
    mr: Spacing;

    /**
     * Abreviação de propriedade de estilo `marginBottom`
     */
    @Prop()
    marginBottom: Spacing;

    /**
     * Abreviação de propriedade de estilo `marginBottom`
     */
    @Prop()
    mb: Spacing;

    /**
     * Abreviação de propriedade de estilo `marginLeft`
     */
    @Prop()
    marginLeft: Spacing;

    /**
     * Abreviação de propriedade de estilo `marginLeft`
     */
    @Prop()
    ml: Spacing;

    /**
     * Abreviação de propriedade de estilo `fontSize`
     */
    @Prop({ reflect: true })
    fontSize: FontSize;

    /**
     * Abreviação de propriedade de estilo `lineHeight`
     */
    @Prop({ reflect: true })
    lineHeight: LineHeight;

    /**
     * Abreviação de propriedade de estilo `fontWeight`
     */
    @Prop({ reflect: true })
    fontWeight: FontWeight;

    /**
     * Abreviação de propriedade de estilo `borderWidth`
     */
    @Prop()
    border: BorderWidth;

    /**
     * Abreviação de propriedade de estilo `borderWidth`
     */
    @Prop()
    borderWidth: BorderWidth;

    /**
     * Abreviação de propriedade de estilo `borderColor`
     */
    @Prop()
    borderColor: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `borderTop`
     */
    @Prop()
    borderTop: BorderWidth;

    /**
     * Abreviação de propriedade de estilo `borderTopWidth`
     */
    @Prop()
    borderTopWidth: BorderWidth;

    /**
     * Abreviação de propriedade de estilo `borderTopColor`
     */
    @Prop()
    borderTopColor: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `borderRight`
     */
    @Prop()
    borderRight: BorderWidth;

    /**
     * Abreviação de propriedade de estilo `borderRightWidth`
     */
    @Prop()
    borderRightWidth: BorderWidth;

    /**
     * Abreviação de propriedade de estilo `borderRightColor`
     */
    @Prop()
    borderRightColor: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `borderBottom`
     */
    @Prop()
    borderBottom: BorderWidth;

    /**
     * Abreviação de propriedade de estilo `borderBottomWidth`
     */
    @Prop()
    borderBottomWidth: BorderWidth;

    /**
     * Abreviação de propriedade de estilo `borderBottomColor`
     */
    @Prop()
    borderBottomColor: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `borderLeft`
     */
    @Prop()
    borderLeft: BorderWidth;

    /**
     * Abreviação de propriedade de estilo `borderLeftWidth`
     */
    @Prop()
    borderLeftWidth: BorderWidth;

    /**
     * Abreviação de propriedade de estilo `borderLeftColor`
     */
    @Prop()
    borderLeftColor: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `borderLeft` and `borderRight`
     */
    @Prop()
    borderX: BorderWidth;

    /**
     * Abreviação de propriedade de estilo `borderTop` and `borderBottom`
     */
    @Prop()
    borderY: BorderWidth;

    /**
     * Abreviação de propriedade de estilo `borderRadius`
     */
    @Prop()
    borderRadius: BorderRadius;

    /**
     * Abreviação de propriedade de estilo `borderTopLeftRadius`
     */
    @Prop()
    borderTopLeftRadius: BorderRadius;

    /**
     * Abreviação de propriedade de estilo `borderTopRightRadius`
     */
    @Prop()
    borderTopRightRadius: BorderRadius;

    /**
     * Abreviação de propriedade de estilo `borderBottomRightRadius`
     */
    @Prop()
    borderBottomRightRadius: BorderRadius;

    /**
     * Abreviação de propriedade de estilo `borderBottomLeftBottom`
     */
    @Prop()
    borderBottomLeftRadius: BorderRadius;

    /**
     * Abreviação de propriedade de estilo `borderTopLeftRadius` and `borderTopRightRadius`
     */
    @Prop()
    borderTopRadius: BorderRadius;

    /**
     * Abreviação de propriedade de estilo `borderTopRightRadius` and `borderBottomRightRadius`
     */
    @Prop()
    borderRightRadius: BorderRadius;

    /**
     * Abreviação de propriedade de estilo `borderBottomRightRadius` and `borderBottomLeftRadius`
     */
    @Prop()
    borderBottomRadius: BorderRadius;

    /**
     * Abreviação de propriedade de estilo `borderTopLeftRadius` and `borderBottomLeftRadius`
     */
    @Prop()
    borderLeftRadius: BorderRadius;

    /**
     * Abreviação de propriedade de estilo `boxShadow`
     */
    @Prop()
    boxShadow: Shadow;

    /**
     * Abreviação de propriedade de estilo `opacity`
     */
    @Prop()
    opacity: Opacity;

    /**
     * Abreviação de propriedade de estilo `width`
     */
    @Prop()
    width: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `maxWidth`
     */
    @Prop()
    maxW: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `minWidth`
     */
    @Prop()
    minW: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `height`
     */
    @Prop()
    height: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `maxHeight`
     */
    @Prop()
    maxH: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `minHeight`
     */
    @Prop()
    minH: ResponsiveProp<string>;

    /**
     * Abreviação de propriedade de estilo `display`
     */
    @Prop()
    display: ResponsiveProp<string>;

    /**
     * Abreviação de prop no estilo `alignItems`
     */
    @Prop()
    alignItems: Align;

    /**
     * Abreviação de prop de estilo `justifyContent`
     */
    @Prop()
    justify: Justify;

    render() {
        return (
            <Host class={setPropStyle(this)}>
                <slot />
            </Host>
        );
    }
}
