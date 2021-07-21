import { h } from '@stencil/core';

import readme from './readme.md';
import docs from './heading.docs.mdx';

const content = 'Apollo Design system';

export default {
    title: 'Typography/Heading',
    component: 'apollo-heading',
    parameters: {
        docs: { page: docs },
        notes: readme,
    },
    argTypes: {
        color: {
            description: 'Abreviação de propriedade de estilo `color`',
            table: {
                defaultValue: { summary: 'black' },
            },
            control: {
                type: 'text',
            },
        },
        size: {
            description: 'Para aumentar o tamanho da fonte do texto, você pode passar a propriedade `size`.',
            table: {
                defaultValue: { summary: 'md' },
            },
            control: {
                type: 'select',
                options: ['sm', 'md', 'lg'],
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
    },
};

export const Base = (args: any) => {
    return <apollo-heading {...args}>{content}</apollo-heading>;
};
