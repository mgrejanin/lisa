import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';
import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './box.docs.mdx';

const content = 'Box';
const spacingOptions = [null, ...Object.keys(Token.spacing)];
const fontSize = Object.keys(Token.fontSize);
const borderOptions = [null, ...Object.keys(Token.borderWidth)];
const opacityOptions = [null, ...Object.keys(Token.opacity)];
const borderRadiusOptions = [null, ...Object.keys(Token.borderRadius)];
const lineHeightOptions = [null, ...Object.keys(Token.lineHeight)];
const fontWeightOptions = [null, ...Object.keys(Token.fontWeight)];
const shadowOptions = [null, ...Object.keys(Token.boxShadow)];

export default {
    title: 'Layouts/Box',
    component: 'apollo-box',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        bg: {
            description: 'Abreviação de propriedade de estilo `backgroundColor`',
            control: {
                type: 'text',
            },
        },
        color: {
            description: 'Abreviação de propriedade de estilo `color`',
            control: {
                type: 'text',
            },
        },
        p: {
            description: 'Abreviação de propriedade de estilo `padding`',
            control: {
                type: 'select',
                options: spacingOptions,
            },
        },
        m: {
            description: 'Abreviação de propriedade de estilo `margin`',
            control: {
                type: 'select',
                options: spacingOptions,
            },
        },
        'font-size': {
            description: 'Abreviação de propriedade de estilo `fontSize`',
            control: {
                type: 'select',
                options: fontSize,
            },
        },
        'line-height': {
            description: 'Abreviação de propriedade de estilo `lineHeight`',
            control: {
                type: 'select',
                options: lineHeightOptions,
            },
        },
        'font-weight': {
            description: 'Abreviação de propriedade de estilo `fontWeight`',
            control: {
                type: 'select',
                options: fontWeightOptions,
            },
        },
        border: {
            description: 'Abreviação de propriedade de estilo `border`',
            control: {
                type: 'select',
                options: borderOptions,
            },
        },
        'border-color': {
            description: 'Abreviação de propriedade de estilo `borderColor`',
            control: {
                type: 'text',
            },
        },
        'border-radius': {
            description: 'Abreviação de propriedade de estilo `borderRadius`',
            control: {
                type: 'select',
                options: borderRadiusOptions,
            },
        },
        'box-shadow': {
            description: 'Abreviação de propriedade de estilo `boxShadow`',
            control: {
                type: 'select',
                options: shadowOptions,
            },
        },
        opacity: {
            description: 'Abreviação de propriedade de estilo `opacity`',
            control: {
                type: 'select',
                options: opacityOptions,
            },
        },
        width: {
            description: 'Abreviação de propriedade de estilo `width`',
            control: {
                type: 'text',
            },
        },
        height: {
            description: 'Abreviação de propriedade de estilo `height`',
            control: {
                type: 'text',
            },
        },
    },
};

export const Base = (args: any) => {
    return <apollo-box {...args}>{content}</apollo-box>;
};

Base.args = {
    bg: 'primary',
    color: 'white',
    p: '2',
};

export const Colors = (args: any) => {
    return <apollo-box {...args}>{content}</apollo-box>;
};

Colors.args = {
    bg: 'primary',
    color: 'white',
};

export const Padding = (args: any) => {
    return <apollo-box {...args}>{content}</apollo-box>;
};

Padding.args = {
    ...Colors.args,
    p: '2',
};

export const Margin = (args: any) => {
    return <apollo-box {...args}>{content}</apollo-box>;
};

Margin.args = {
    ...Colors.args,
    m: '2',
};

export const Font = (args: any) => {
    return <apollo-box {...args}>{content}</apollo-box>;
};

Font.args = {
    'font-size': '4xl',
};

export const Border = (args: any) => {
    return <apollo-box {...args}>{content}</apollo-box>;
};

Border.args = {
    border: 'medium',
};

export const BorderRadius = (args: any) => {
    return <apollo-box {...args}>{content}</apollo-box>;
};

BorderRadius.args = {
    ...Colors.args,
    p: '2',
    'border-radius': 'pill',
};

export const Shadow = (args: any) => {
    return <apollo-box {...args}>{content}</apollo-box>;
};

Shadow.args = {
    'box-shadow': 'medium',
};

export const Opacity = (args: any) => {
    return <apollo-box {...args}>{content}</apollo-box>;
};

Opacity.args = {
    opacity: 'light',
};
