import { Token } from './../../../../../../packages/sass-functions/src/lib/tokens';
import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './text.docs.mdx';

const content =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const fontSizeOptions = Object.keys(Token.fontSize);

export default {
    title: 'Typography/Text',
    component: 'apollo-text',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        color: {
            description: 'Abreviação de propriedade de estilo `color`',
            table: {
                defaultValue: { summary: 'grayscale.base' },
            },
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
                options: fontSizeOptions,
            },
        },
        'is-truncated': {
            description: 'Passe `isTruncated` para renderizar reticência quando o texto exceder a largura.',
            table: {
                defaultValue: { summary: 'false' },
            },
            control: {
                type: 'boolean',
            },
        },
        'no-of-lines': {
            description:
                'Da mesma forma, que o `isTruncated` passe a propriedade `noOfLines` e defina-o com o número de linhas desejado.',
            control: {
                type: 'number',
            },
        },
        'text-align': {
            description: 'Abreviação de prop no estilo `textAlign`',
            table: {
                defaultValue: { summary: 'left' },
            },
            control: {
                type: 'select',
                options: ['left', 'center', 'right'],
            },
        },
    },
};

export const Base = (args: any) => {
    return <apollo-text {...args}>{content}</apollo-text>;
};

export const Truncate = (args: any) => {
    return <apollo-text {...args}>{content}</apollo-text>;
};

Truncate.args = {
    'is-truncated': true,
};

export const NoOfLines = (args: any) => {
    return <apollo-text {...args}>{content}</apollo-text>;
};

NoOfLines.args = {
    'no-of-lines': 3,
};
