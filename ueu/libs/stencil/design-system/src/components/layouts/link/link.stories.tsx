import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';
import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './link.docs.mdx';

const content = 'Apollo Design System';
const fontSize = Object.keys(Token.fontSize);

export default {
    title: 'Navigation/Link',
    component: 'apollo-link',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        color: {
            description: 'Abreviação de propriedade de estilo `color`',
            table: {
                defaultValue: { summary: 'primary' },
            },
            control: {
                type: 'text',
            },
        },
        'is-external': {
            description: 'Se `true`, o link será aberto em uma nova aba',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        href: {
            description:
                'Contém um URL ou fragmento de URL para o qual o hiperlink aponta. * Se esta propriedade for definida, uma tag âncora será renderizada.',
            control: {
                type: 'text',
            },
        },
        'font-size': {
            description: 'Para aumentar o tamanho da fonte do texto, você pode passar a propriedade `fontSize`.',
            table: {
                defaultValue: { summary: 'base' },
            },
            control: {
                type: 'select',
                options: fontSize,
            },
        },
        'hover-color': {
            description: 'Cor do link no estado hover',
            table: {
                defaultValue: { summary: 'brand' },
            },
            control: {
                type: 'text',
            },
        },
    },
};

export const Base = (args: any) => {
    return <apollo-link {...args}>{content}</apollo-link>;
};
